import {useEffect, useState} from 'react';
import useSound from 'use-sound';
import creativeMinds from '../assets/creativeminds.mp3';
import {IconContext} from 'react-icons';
import {BiSkipNext, BiSkipPrevious} from 'react-icons/bi';
import {AiFillPlayCircle, AiFillPauseCircle} from 'react-icons/ai';

function Player() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, {pause, duration, sound}] = useSound(creativeMinds);

    const [time, setTime] = useState({
        min: 0,
        sec: 0
    });
    const [currTime, setCurrTime] = useState({
        min: 0,
        sec: 0
    });
    const [seconds, setSeconds] = useState();

    useEffect(() => {
        if (duration) {
            const durationInSec = duration / 1000;
            const min = Math.floor(durationInSec / 60);
            const sec = Math.floor(durationInSec % 60);

            setTime({min, sec});
        }
    }, [isPlaying]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));

                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrTime({
                    min,
                    sec
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [sound]);

    const playMusic = () => {
        play();
        setIsPlaying(true);
    };

    const pauseMusic = () => {
        pause();
        setIsPlaying(false);
    };

    const formatTime = (time) => {
        const formattedMinutes = time ? formatTimeNumber(time.min) : '00';
        const formattedSeconds = time ? formatTimeNumber(time.sec): '00';

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const formatTimeNumber = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    return (
        <div className="component">
            <h2>Playing Now</h2>
            <img
                className="musicCover"
                src="https://picsum.photos/200/200"
                alt="Music cover"
            />
            <div>
                <h3 className="title">Creative Minds</h3>
                <p className="subTitle">Benjamin Tissot</p>
            </div>
            <div>
                <div className="time">
                    <p>
                        {formatTime(currTime)}
                    </p>
                    <p>
                        {formatTime(time)}
                    </p>
                </div>
                <input
                    type="range"
                    min="0"
                    max={duration / 1000}
                    default="0"
                    value={seconds}
                    className="timeline"
                    onChange={(e) => {
                        sound.seek([e.target.value]);
                    }}
                />
            </div>
            <div>
                <button className="controlButton">
                    <IconContext.Provider value={{size: '3em', color: '#27AE60'}}>
                        <BiSkipPrevious/>
                    </IconContext.Provider>
                </button>
                {!isPlaying ? (
                    <button className="controlButton" onClick={playMusic}>
                        <IconContext.Provider value={{size: '3em', color: '#27AE60'}}>
                            <AiFillPlayCircle/>
                        </IconContext.Provider>
                    </button>
                ) : (
                    <button className="controlButton" onClick={pauseMusic}>
                        <IconContext.Provider value={{size: '3em', color: '#27AE60'}}>
                            <AiFillPauseCircle/>
                        </IconContext.Provider>
                    </button>
                )}
                <button className="controlButton">
                    <IconContext.Provider value={{size: '3em', color: '#27AE60'}}>
                        <BiSkipNext/>
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    );
}

export default Player;
