export function logEvent(level, message) {
    const user = localStorage.getItem("user");
    fetch('proxy/log.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            level,
            message,
            user
        })
    }).catch(err => {
        console.error('Log failed', err);
    });
}