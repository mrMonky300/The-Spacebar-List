
export function getYoutubeIdFromUrl(url) {
    if (!url) return '';

    try {
        const parsed = new URL(url);

        if (
            parsed.hostname === 'youtu.be' ||
            parsed.hostname.endsWith('.youtu.be')
        ) {
            return parsed.pathname.split('/').filter(Boolean)[0] || '';
        }

        if (
            parsed.hostname.includes('youtube.com') ||
            parsed.hostname.includes('youtube-nocookie.com')
        ) {
            return (
                parsed.searchParams.get('v') ||
                parsed.pathname.match(/\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ||
                ''
            );
        }
    } catch {
        return '';
    }

    return '';
}

export function getMedalIdFromUrl(url) {
    if (!url) return '';

    try {
        const parsed = new URL(url);

        if (!parsed.hostname.endsWith('medal.tv')) {
            return '';
        }

        const match = parsed.pathname.match(
            /\/(?:games\/[^/]+\/clips|clips)\/([^/]+)/
        );

        return match?.[1] || '';
    } catch {
        return '';
    }
}

export function embed(video) {
    if (!video) return '';

    // Medal.tv
    if (video.includes('medal.tv')) {
        const medalId = getMedalIdFromUrl(video);

        if (!medalId) return '';

        return `https://medal.tv/clip/${encodeURIComponent(medalId)}`;
    }

    // YouTube
    const youtubeId = getYoutubeIdFromUrl(video);

    if (youtubeId) {
        return `https://www.youtube.com/embed/${encodeURIComponent(youtubeId)}`;
    }

    return '';
}

export function localize(num) {
    return num.toLocaleString(undefined, {
        minimumFractionDigits: 3
    });
}

export function getThumbnailFromId(id) {
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}

// Shuffle array
export function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}
