import { Component, ElementRef, HostListener, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent {
  private readonly videoElement = viewChild<ElementRef<HTMLVideoElement>>('video');
  private readonly playbackSpeedStorageKey = 'thaheen-lms-playback-speed';

  readonly playbackSpeed = signal(this.getSavedPlaybackSpeed());

  readonly videoSrc = input.required<string>();
  readonly startPositionSec = input<number>(0);
  readonly isPlaying = signal(false);
  readonly currentTime = signal(0);
  readonly duration = signal(0);
  readonly hasError = signal(false);
  readonly progressChange = output<{
    positionSec: number;
    durationSec: number;
  }>();

  onLoadedMetadata(video: HTMLVideoElement): void {
    this.duration.set(video.duration);
    video.playbackRate = this.playbackSpeed();

    const startPosition = this.startPositionSec();

    if (startPosition > 0 && startPosition < video.duration) {
      video.currentTime = startPosition;
      this.currentTime.set(startPosition);
    }
  }

  onTimeUpdate(video: HTMLVideoElement): void {
    this.currentTime.set(video.currentTime);

    this.progressChange.emit({
      positionSec: video.currentTime,
      durationSec: video.duration,
    });
  }

  togglePlay(video: HTMLVideoElement): void {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  formatTime(seconds: number): string {
    if (!Number.isFinite(seconds)) {
      return '00:00';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  seek(video: HTMLVideoElement, event: Event): void {
    const input = event.target as HTMLInputElement;
    const newTime = Number(input.value);

    video.currentTime = newTime;
    this.currentTime.set(newTime);
  }

  changePlaybackSpeed(video: HTMLVideoElement, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const speed = Number(select.value);

    video.playbackRate = speed;
    this.playbackSpeed.set(speed);

    localStorage.setItem(this.playbackSpeedStorageKey, String(speed));
  }

  toggleFullscreen(player: HTMLElement): void {
    if (!document.fullscreenElement) {
      player.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  onEnded(video: HTMLVideoElement): void {
    this.currentTime.set(video.duration);

    this.progressChange.emit({
      positionSec: video.duration,
      durationSec: video.duration,
    });
  }

  onVideoError(): void {
    this.hasError.set(true);
    this.isPlaying.set(false);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const video = this.videoElement()?.nativeElement;

    if (!video) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'BUTTON') {
      return;
    }

    if (event.code === 'Space') {
      event.preventDefault();
      this.togglePlay(video);
    }

    if (event.code === 'ArrowRight') {
      video.currentTime = Math.min(video.currentTime + 5, video.duration);
    }

    if (event.code === 'ArrowLeft') {
      video.currentTime = Math.max(video.currentTime - 5, 0);
    }
  }

  private getSavedPlaybackSpeed(): number {
    const savedSpeed = Number(localStorage.getItem(this.playbackSpeedStorageKey));

    const allowedSpeeds = [1, 1.25, 1.5, 2];

    return allowedSpeeds.includes(savedSpeed) ? savedSpeed : 1;
  }
}
