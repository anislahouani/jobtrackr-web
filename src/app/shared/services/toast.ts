import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message = signal('');
  visible = signal(false);

  show(message: string): void {
    this.message.set(message);
    this.visible.set(true);

    setTimeout(() => {
      this.visible.set(false);
    }, 3000);
  }
}
