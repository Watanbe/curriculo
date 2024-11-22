import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pt',
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
export class PtComponent implements AfterViewInit {
  @ViewChild('resumeCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Configurações iniciais
    const centerX = this.canvas.nativeElement.width / 2;
    let currentY = 50; // Posição inicial Y
    const margin = 40; // Margem lateral
    const maxWidth = this.canvas.nativeElement.width - margin * 2; // Largura máxima do texto

    // Cabeçalho
    ctx.textAlign = 'center';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('Eduardo Watanabe Lima', centerX, currentY);

    currentY += 30;
    ctx.font = '16px Arial';
    ctx.fillText('Desenvolvedor Backend | Taubaté, SP', centerX, currentY);

    currentY += 25;
    ctx.fillText('📧 eduardowatanabelima@gmail.com | 📱 (12) 99170-4106', centerX, currentY);

    currentY += 25;
    ctx.fillText('🔗 linkedin.com/in/watanbe | 🔗 github.com/Watanbe', centerX, currentY);

    // Linha separadora
    currentY += 20;
    ctx.beginPath();
    ctx.moveTo(margin, currentY);
    ctx.lineTo(this.canvas.nativeElement.width - margin, currentY);
    ctx.strokeStyle = '#333';
    ctx.stroke();

    // Resumo Profissional
    currentY += 40;
    this.drawSection(ctx, 'Resumo Profissional', currentY);
    currentY += 30;
    ctx.textAlign = 'left';
    this.wrapText(
      ctx,
      'Desenvolvedor Backend com mais de 7 anos de experiência em C#, PHP e Python. Especializado em dotnet Core, Laravel e integração com sistemas em nuvem.',
      margin,
      currentY,
      maxWidth,
      20
    );

    // Habilidades Técnicas
    currentY += 70;
    this.drawSection(ctx, 'Habilidades Técnicas', currentY);
    currentY += 30;
    const skills = [
      '• Linguagens: C#, PHP, Python, JavaScript',
      '• Frameworks: dotnet Core, Laravel, Django',
      '• Banco de Dados: MySQL, MongoDB',
      '• Ferramentas: Docker, Jenkins, AWS, Grafana',
    ];
    skills.forEach((skill) => {
      this.wrapText(ctx, skill, margin, currentY, maxWidth, 20);
      currentY += 30;
    });

    // Experiência Profissional
    currentY += 20;
    this.drawSection(ctx, 'Experiência Profissional', currentY);
    currentY += 30;

    const experiences = [
      {
        title: 'Estagiário | Valid S.A',
        period: '2016 - 2017',
        description:
          'Desenvolvimento de uma aplicação para controle de patrimônio utilizando dotnet Core e MySQL.',
      },
      {
        title: 'Programador Júnior/Pleno | Thompson Management Horizons',
        period: '2018 - 2021 (com hiato de 6 meses)',
        description:
          'Desenvolvimento de uma plataforma de controle de fluxo para comunicação interna de empresas usando Laravel, MySQL e Azure.',
      },
      {
        title: 'Desenvolvedor Backend Senior | Hipr Sistemas',
        period: '2020',
        description:
          'Desenvolvimento de uma API em dotnet Core para o aplicativo GoCart, um e-commerce para acesso ao comércio local.',
      },
      {
        title: 'Programador Backend | Dentro da História',
        period: '2021 - atualmente',
        description:
          'Desenvolvimento da plataforma de vendas de livros customizados para escolas utilizando CakePHP, MySQL e AWS.',
      },
      {
        title: 'Programador Pleno | Ecotrak Facility Management Software',
        period: '2022 - 2023',
        description:
          'Desenvolvimento de um WMMS em CakePHP, MySQL e AWS.',
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

    // Educação
    this.drawSection(ctx, 'Educação', currentY);
    currentY += 40;
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Bacharelado em Engenharia de Computação | Universidade de Taubaté', margin, currentY);
    currentY += 25;
    ctx.font = '14px Arial';
    ctx.fillText('Fev de 2014 - Nov de 2018', margin, currentY);

    currentY += 30; // Espaço extra
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Pós-graduação em Redes Neurais | Uniube - Universidade de Uberaba', margin, currentY);
    currentY += 25;
    ctx.font = '14px Arial';
    ctx.fillText('Nov de 2024 - Nov de 2025', margin, currentY);
    ctx.fillText('Competências: C, C++, Python, PyTorch', margin, currentY + 20);
  }

  drawSection(ctx: CanvasRenderingContext2D, title: string, y: number) {
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(title, 40, y);

    // Linha sob o título
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

    // Obter a imagem do canvas
    const canvasData = canvasElement.toDataURL('image/png');

    // Adicionar a imagem no PDF
    pdf.addImage(canvasData, 'PNG', 0, 0, canvasElement.width, canvasElement.height);

    // Fazer o download
    pdf.save('curriculo-pt.pdf');
  }
}
