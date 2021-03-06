function YouTubeEmbed({ youtubeId }) {
    return (
        <div
            style={{
                position: "relative",
                paddingBottom: "56.25%" /* 16:9 */,
                paddingTop: 25,
                height: 0,
                width: "100%",
            }}
        >
            <iframe
                title="YouTube Socialiite Shoutout"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
            />
        </div>
    );
}

export default YouTubeEmbed;
