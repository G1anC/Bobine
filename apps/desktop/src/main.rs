#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

use tauri::Manager;

#[cfg(target_os = "windows")]
const VLC: &str = r"C:\Program Files\VideoLAN\VLC\vlc.exe";
#[cfg(target_os = "macos")]
const VLC: &str = "/Applications/VLC.app/Contents/MacOS/VLC";
#[cfg(not(any(target_os = "windows", target_os = "macos")))]
const VLC: &str = "vlc";

/// True for the only thing Bobine hands to VLC: a web stream, never a file or a VLC option.
fn is_stream_url(url: &str) -> bool {
    (url.starts_with("https://") || url.starts_with("http://"))
        && !url.contains(char::is_whitespace)
}

/// Starts the VLC installed on this computer on one stream. The error says so when VLC is missing.
#[tauri::command]
fn open_in_vlc(url: String) -> Result<(), String> {
    if !is_stream_url(&url) {
        return Err("Bobine only sends web streams to VLC".into());
    }
    let mut player = Command::new(VLC)
        .arg(url)
        .spawn()
        .map_err(|error| format!("VLC did not start: {error}"))?;
    std::thread::spawn(move || player.wait());
    Ok(())
}

/// Starts the Bobine window. A second launch focuses the running one instead of opening another.
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _argv, _cwd| {
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.unminimize();
                let _ = window.set_focus();
            }
        }))
        .invoke_handler(tauri::generate_handler![open_in_vlc])
        .run(tauri::generate_context!())
        .expect("Bobine failed to start");
}

#[cfg(test)]
mod tests {
    use super::is_stream_url;

    #[test]
    fn accepts_web_streams_only() {
        assert!(is_stream_url(
            "https://archive.org/download/Sintel/sintel.mp4"
        ));
        assert!(!is_stream_url("--play-and-exit"));
        assert!(!is_stream_url("file:///etc/passwd"));
        assert!(!is_stream_url("https://archive.org/a b.mp4"));
    }
}
