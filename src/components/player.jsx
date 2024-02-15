import { VolumeDown, VolumeUp } from '@mui/icons-material'
import React from 'react'
import { useRef, useState } from 'react'
import { PlayArrowSharp, Pause } from '@mui/icons-material'
import { Fullscreen } from '@mui/icons-material'
import { Minimize } from '@mui/icons-material'

export default function Player() {
  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullView, setFullView] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [volume, setVolume] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoIndex, setVideoIndex] = useState(0)

  const [playlist, setPlaylist] = useState([
    {
      description: 'The first Blender Open Movie from 2006',
      sources: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      ],
      subtitle: 'By Blender Foundation',
      thumb: 'images/ElephantsDream.jpg',
      title: 'Elephant Dream',
    },
    {
      description:
        'HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.',
      sources: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      ],
      subtitle: 'By Google',
      thumb: 'images/ForBiggerBlazes.jpg',
      title: 'For Bigger Blazes',
    },
    {
      description:
        "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
      sources: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      ],
      subtitle: 'By Google',
      thumb: 'images/ForBiggerEscapes.jpg',
      title: 'For Bigger Escape',
    },
    {
      description:
        'Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.',
      sources: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      ],
      subtitle: 'By Google',
      thumb: 'images/ForBiggerFun.jpg',
      title: 'For Bigger Fun',
    },
    {
      description:
        'Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.',
      sources: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      ],
      subtitle: 'By Google',
      thumb: 'images/ForBiggerJoyrides.jpg',
      title: 'For Bigger Joyrides',
    },
  ])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }
  const handleVolume = (vol) => {
    setVolume(vol)
    videoRef.current.volume = vol
  }

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed)
    videoRef.current.playbackRate = speed
  }

  const handleFullView = () => {
    if (!document.fullscreenElement) {
      setFullView(true)
      playerRef.current.requestFullscreen().catch((err) => {
        console.log(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        )
      })
    } else {
      setFullView(false)
      document.exitFullscreen()
    }
  }

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime)
  }

  const handleSeek = (time) => {
    videoRef.current.currentTime = time
    setCurrentTime(time)
  }

  const handleVideoEnd = () => {
    // Play next video in the playlist
    if (videoIndex < playlist.length - 1) {
      setVideoIndex(videoIndex + 1)
    } else {
      setVideoIndex(0) // Loop playlist
    }
  }

  return (
    <div className="flex justify-center">
      <div
        className="w-full md:w-100% lg:w-100% md:mx-6 lg:mx-6"
        ref={playerRef}
      >
        <video
          onTimeUpdate={handleTimeUpdate}
          ref={videoRef}
          src={playlist[videoIndex].sources}
          // onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          playbackRate={playbackSpeed}
        ></video>
        <div className=" bg-black bg-opacity-50 flex items-center justify-between p-2">
          <div className="flex items-center">
            <button onClick={handlePlayPause}>
              {isPlaying ? <Pause /> : <PlayArrowSharp />}
            </button>
            <VolumeDown color="white" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={(e) => handleVolume(e.target.value)}
            />
            <VolumeUp />
            <input
              type="range"
              min={0}
              max={videoRef.current ? videoRef.current.duration : 0}
              value={currentTime}
              onChange={(e) => handleSeek(e.target.value)}
              className="mx-2"
            />
            <span className="text-white">
              {Math.floor(currentTime)} /{' '}
              {Math.floor(videoRef.current ? videoRef.current.duration : 0)}
            </span>
          </div>
          <div className="flex items-center">
            <h4 className="mr-1">Speed</h4>
            <select
              value={playbackSpeed}
              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>Normal</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
            <button onClick={handleFullView}>
              {isFullView ? <Minimize /> : <Fullscreen />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
