import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerComponent } from './video-player.component';

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPlayerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('videoSrc', 'assets/videos/lesson1.mp4');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
