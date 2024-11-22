import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-en',
  standalone: true,
  template: `
  <div style="text-align: center; margin-top: 20px;">
      <button (click)="downloadPDF()" style="
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        font-size: 16px;
        margin-bottom: 20px;
      ">
        Download PDF
      </button>
    </div>
  <canvas #resumeCanvas width="794" height="1200" style="
    background: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    margin: 20px auto;
    display: block;
  "></canvas>`,
})
export class EnComponent implements AfterViewInit {
  @ViewChild('resumeCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const centerX = this.canvas.nativeElement.width / 2;
    let currentY = 50;
    const margin = 40;
    const maxWidth = this.canvas.nativeElement.width - margin * 2;

    // Header
    ctx.textAlign = 'center';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('Eduardo Watanabe Lima', centerX, currentY);

    currentY += 30;
    ctx.font = '16px Arial';
    ctx.fillText('Backend Developer | Taubaté, SP', centerX, currentY);

    currentY += 25;
    ctx.fillText('📧 eduardowatanabelima@gmail.com | 📱 (12) 99170-4106', centerX, currentY);

    currentY += 25;
    ctx.fillText('🔗 linkedin.com/in/watanbe | 🔗 github.com/Watanbe', centerX, currentY);

    currentY += 20;
    ctx.beginPath();
    ctx.moveTo(margin, currentY);
    ctx.lineTo(this.canvas.nativeElement.width - margin, currentY);
    ctx.strokeStyle = '#333';
    ctx.stroke();

    currentY += 40;
    this.drawSection(ctx, 'Professional Summary', currentY);
    currentY += 30;
    ctx.textAlign = 'left';
    this.wrapText(
      ctx,
      'Backend Developer with over 7 years of experience in C#, PHP, and Python. Specialized in dotnet Core, Laravel, and cloud systems integration.',
      margin,
      currentY,
      maxWidth,
      20
    );

    currentY += 70;
    this.drawSection(ctx, 'Technical Skills', currentY);
    currentY += 30;
    const skills = [
      '• Languages: C#, PHP, Python, JavaScript',
      '• Frameworks: dotnet Core, Laravel, Django',
      '• Databases: MySQL, MongoDB',
      '• Tools: Docker, Jenkins, AWS, Grafana',
    ];
    skills.forEach((skill) => {
      this.wrapText(ctx, skill, margin, currentY, maxWidth, 20);
      currentY += 30;
    });

    currentY += 20;
    this.drawSection(ctx, 'Professional Experience', currentY);
    currentY += 30;

    const experiences = [
      {
        title: 'Intern | Valid S.A',
        period: '2016 - 2017',
        description: 'Developed an asset control application using dotnet Core and MySQL.',
      },
      {
        title: 'Junior/Mid-Level Programmer | Thompson Management Horizons',
        period: '2018 - 2021 (with a 6-month gap)',
        description:
          'Developed an internal communication flow control platform for companies using Laravel, MySQL, and Azure.',
      },
      {
        title: 'Senior Backend Developer | Hipr Sistemas',
        period: '2020',
        description:
          'Developed a dotnet Core API for the GoCart app, an e-commerce platform for accessing local commerce.',
      },
      {
        title: 'Backend Programmer | Dentro da História',
        period: '2021 - present',
        description:
          'Developed the sales platform for personalized books for schools using CakePHP, MySQL, and AWS.',
      },
      {
        title: 'Mid-Level Programmer | Ecotrak Facility Management Software',
        period: '2022 - 2023',
        description: 'Developed a WMMS using CakePHP, MySQL, and AWS.',
      },
    ];

    experiences.forEach((exp) => {
      ctx.font = 'bold 16px Arial';
      ctx.fillText(exp.title, margin, currentY);
      currentY += 25;
      ctx.font = 'italic 14px Arial';
      ctx.fillText(exp.period, margin, currentY);
      currentY += 25;
      ctx.font = '14px Arial';
      this.wrapText(ctx, exp.description, margin, currentY, maxWidth, 20);
      currentY += 50;
    });

    this.drawSection(ctx, 'Education', currentY);
    currentY += 40;
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Bachelor in Computer Engineering | Universidade de Taubaté', margin, currentY);
    currentY += 25;
    ctx.font = '14px Arial';
    ctx.fillText('Feb 2014 - Nov 2018', margin, currentY);

    currentY += 30;
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Postgraduate in Neural Networks | Uniube - Universidade de Uberaba', margin, currentY);
    currentY += 25;
    ctx.font = '14px Arial';
    ctx.fillText('Nov 2024 - Nov 2025', margin, currentY);
    ctx.fillText('Skills: C, C++, Python, PyTorch', margin, currentY + 20);
  }

  drawSection(ctx: CanvasRenderingContext2D, title: string, y: number) {
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(title, 40, y);

    ctx.beginPath();
    ctx.moveTo(40, y + 7);
    ctx.lineTo(this.canvas.nativeElement.width - 40, y + 5);
    ctx.strokeStyle = '#999';
    ctx.stroke();
  }

  wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const words = text.split(' ');
    let line = '';
    ctx.font = '18px Arial';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
    return y;
  }

  downloadPDF() {
    const canvasElement = this.canvas.nativeElement;
    const pdf = new jsPDF('portrait', 'px', [canvasElement.width, canvasElement.height]);

    const canvasData = canvasElement.toDataURL('image/png');
    pdf.addImage(canvasData, 'PNG', 0, 0, canvasElement.width, canvasElement.height);

    pdf.save('resume-en.pdf');
  }
}
