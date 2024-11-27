import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage {
  // Preguntas del quiz
  questions = [
    {
      question: '¿Qué es un metrónomo y para qué se utiliza en la música?',
      options: [
        { text: 'Un dispositivo para afinar instrumentos', correct: false, color: '' },
        { text: 'Un aparato que mide la velocidad del pulso musical', correct: true, color: '' },
        { text: 'Un accesorio decorativo para músicos', correct: false, color: '' },
      ],
      selected: null,
    },
    {
      question: '¿Qué unidad de medida utiliza el metrónomo para indicar la velocidad de una pieza musical?',
      options: [
        { text: 'Hertz (Hz)', correct: false, color: '' },
        { text: 'Beats por minuto (BPM)', correct: true, color: '' },
        { text: 'Decibelios (dB)', correct: false, color: '' },
      ],
      selected: null,
    },
    {
      question: '¿Cómo puede ayudar el metrónomo a un músico durante su práctica?',
      options: [
        { text: 'Estableciendo un ritmo constante para mejorar la sincronización', correct: true, color: '' },
        { text: 'Detectando errores en la afinación', correct: false, color: '' },
        { text: 'Grabando la música para analizarla más tarde', correct: false, color: '' },
      ],
      selected: null,
    },
    {
      question: '¿Qué elementos puedes ajustar en un metrónomo digital o mecánico?',
      options: [
        { text: 'Volumen y eco', correct: false, color: '' },
        { text: 'Ritmo y tiempo (BPM)', correct: true, color: '' },
        { text: 'La tonalidad de la música', correct: false, color: '' },
      ],
      selected: null,
    },
  ];

  correctCount: number = 0;

  constructor(private alertController: AlertController) {}

  // Método para validar el quiz
  async submitQuiz() {
    this.correctCount = 0;

    // Validar las respuestas
    this.questions.forEach((q) => {
      if (q.selected !== null) {
        const selectedOption = q.options[q.selected];
        if (selectedOption.correct) {
          this.correctCount++;
          selectedOption.color = 'success'; // Marca como correcto
        } else {
          selectedOption.color = 'danger'; // Marca como incorrecto
        }
      } else {
        // Si no seleccionó ninguna opción, marcar todas como sin color
        q.options.forEach((option) => {
          option.color = '';
        });
      }
    });

    // Mostrar mensaje con el resultado
    const alert = await this.alertController.create({
      header: 'Resultado del Quiz',
      message: `Respuestas correctas: ${this.correctCount} de ${this.questions.length}`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Reiniciar el quiz
  resetQuiz() {
    this.correctCount = 0;
    this.questions.forEach((q) => {
      q.selected = null;
      q.options.forEach((option) => {
        option.color = ''; // Reinicia los colores
      });
    });
  }
}
