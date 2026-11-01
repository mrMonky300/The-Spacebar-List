
export function getYoutubeIdFromUrl(url) {
    return url.match(
        /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
    )?.[1] ?? '';
}

export function getMedalIdFromUrl(url) {
    return url.match(
        /medal\.tv\/(?:games\/[^/]+\/clips\/|clips\/)([a-zA-Z0-9_-]+)/,
    )?.[1] ?? '';
}

export function embed(video) {
    if (!video) return "";

    // YouTube
    const youtubeId = getYoutubeIdFromUrl(video);

    if (youtubeId) {
        return `https://www.youtube.com/embed/${youtubeId}`;
    }

    // Medal.tv
    const medalId = getMedalIdFromUrl(video);

    if (medalId) {
        return `https://medal.tv/clip/${medalId}`;
    }

    return "";
}

export function localize(num) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 3 });
}

export function getThumbnailFromId(id) {
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}
