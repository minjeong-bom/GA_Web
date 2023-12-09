export default {
    timeAgo
}
function timeAgo(time) {
    const dateString = time;

    const now = new Date();
    const past = new Date(dateString);
    const diff = now - past;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return `${seconds}초 전`;
    } else if (minutes < 60) {
        return `${minutes}분 전`;
    } else if (hours < 24) {
        return `${hours}시간 전`;
    } else {
        return `${days}일 전`;
    }
}
