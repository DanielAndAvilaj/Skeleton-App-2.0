import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface Question {
  question: string;
  options: string[];
  answer: number;
}

interface QuizSection {
  name: string;
  questions: {
    easy: Question[];
    medium: Question[];
    hard: Question[];
  };
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  finishQuiz() {
    throw new Error('Method not implemented.');
  }

  

  loginUsuario: string = '';
  loginContrasena: string = '';
  loginEdad: Number = 0;
  loginTelefono: string = '';
  mostrarBienvenida: boolean = true;

  quizFinished: boolean = false;
  correctAnswersCount: number = 0;
  incorrectAnswers: any[] = [];
  totalTime: number = 0;
  resultMessage: string = '';

  currentQuestion: number = 0;
  score: number = 0;
  selectedSection: string = '';
  selectedDifficulty: string = '';
  quizStarted: boolean = false;
  timer: number = 0;
  timerInterval: any;
  userAnswers: number[] = [];


  quizSections: QuizSection[] = [
    {
      name: 'Jazz',
      questions: {
        easy: [
          {
            question:
              '¿Cuál es el instrumento principal en una big band de jazz?',
            options: ['Saxofón', 'Trompeta', 'Piano', 'Batería'],
            answer: 1,
          },
          {
            question: "¿Quién es conocido como el 'Rey del Jazz'?",
            options: [
              'Miles Davis',
              'Louis Armstrong',
              'Duke Ellington',
              'John Coltrane',
            ],
            answer: 1,
          },
          {
            question: '¿Cuál es el instrumento que se toca con la corneta?',
            options: ['trompeta', 'Tambor', 'corneta', 'Batería'],
            answer: 3,
          },
        ],
        medium: [
          {
            question: '¿Qué escala es fundamental en el jazz modal?',
            options: [
              'Escala mayor',
              'Escala menor',
              'Escala dórica',
              'Escala pentatónica',
            ],
            answer: 2,
          },
          {
            question: "¿Qué significa 'comping' en jazz?",
            options: ['Improvisar', 'Acompañar', 'Componer', 'Competir'],
            answer: 1,
          },
        ],
        hard: [
          {
            question:
              '¿Qué músico de jazz popularizó el uso del modo frigio en sus composiciones?',
            options: [
              'Miles Davis',
              'John Coltrane',
              'Thelonious Monk',
              'Bill Evans',
            ],
            answer: 1,
          },
          {
            question:
              '¿Qué técnica de improvisación utiliza secuencias de acordes en lugar de escalas?',
            options: [
              'Modal jazz',
              'Bebop',
              'Chord-scale theory',
              'Tritone substitution',
            ],
            answer: 2,
          },
        ],
      },
    },
    {
      name: 'Rock',
      questions: {
        easy: [
          {
            question:
              '¿Cuál es el instrumento principal en la mayoría de las bandas de rock?',
            options: ['Guitarra eléctrica', 'Bajo', 'Batería', 'Teclado'],
            answer: 0,
          },
          {
            question: "¿Qué banda de rock es conocida como 'Los Fab Four'?",
            options: [
              'The Rolling Stones',
              'The Beatles',
              'Led Zeppelin',
              'Pink Floyd',
            ],
            answer: 1,
          },
        ],
        medium: [
          {
            question: '¿Qué técnica de guitarra popularizó Eddie Van Halen?',
            options: ['Bending', 'Tapping', 'Slide', 'Palm muting'],
            answer: 1,
          },
          {
            question:
              '¿Qué subgénero del rock se caracteriza por su uso de distorsión y tempos lentos?',
            options: ['Punk rock', 'Grunge', 'Heavy metal', 'Doom metal'],
            answer: 3,
          },
        ],
        hard: [
          {
            question:
              '¿Qué escala es comúnmente utilizada en los solos de guitarra del rock progresivo?',
            options: [
              'Escala mayor',
              'Escala menor armónica',
              'Escala mixolidia',
              'Escala lidia',
            ],
            answer: 3,
          },
          {
            question:
              "¿Qué técnica de composición utilizó Pink Floyd en la canción 'Money'?",
            options: [
              'Contrapunto',
              'Polirritmia',
              'Modulación métrica',
              'Armonía cuartal',
            ],
            answer: 2,
          },
        ],
      },
    },
    {
      name: 'Pop',
      questions: {
        easy: [
          {
            question: '¿Cuál es la estructura más común en las canciones pop?',
            options: [
              'Verso-Coro-Verso',
              'Intro-Verso-Coro-Puente-Coro',
              'AABA',
              'Rondo',
            ],
            answer: 1,
          },
          {
            question: "¿Qué artista pop es conocida como la 'Reina del Pop'?",
            options: ['Beyoncé', 'Lady Gaga', 'Madonna', 'Britney Spears'],
            answer: 2,
          },
        ],
        medium: [
          {
            question: "¿Qué es un 'hook' en música pop?",
            options: [
              'Un tipo de bajo',
              'Una frase musical pegajosa',
              'Un efecto de sonido',
              'Un tipo de acorde',
            ],
            answer: 1,
          },
          {
            question:
              '¿Qué técnica de producción se utiliza para hacer que las voces suenen más afinadas en el pop moderno?',
            options: ['Reverb', 'Compression', 'Auto-tune', 'Delay'],
            answer: 2,
          },
        ],
        hard: [
          {
            question:
              '¿Qué técnica de composición utilizó Max Martin en muchos de sus éxitos pop?',
            options: [
              'Melodic math',
              'Counterpoint',
              '12-tone technique',
              'Serialism',
            ],
            answer: 0,
          },
          {
            question:
              "¿Qué fenómeno acústico se explota en la producción de pop para crear un sonido más 'grande'?",
            options: [
              'Efecto Haas',
              'Resonancia simpática',
              'Cancelación de fase',
              'Distorsión armónica',
            ],
            answer: 0,
          },
        ],
      },
    },
  ];

  currentQuestions: Question[] = [];

  constructor(
    private router: Router,
    private AlertController: AlertController
  ) {}


  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      const { usuario, contrasena, edad, telefono } = navigation.extras.state as any;
      this.loginUsuario = usuario;
      this.loginContrasena = contrasena;
      this.loginEdad = edad;
      this.loginTelefono = telefono;
    }

    console.log('-----Datos del usuario------');
    console.log('Usuario: ' + this.loginUsuario);
    console.log('Contrasena: ' + this.loginContrasena);
    console.log('Edad: ' + this.loginEdad);
    console.log('Telefono: ' + this.loginTelefono);
  }

  selectSection(section: string) {
    this.selectedSection = section;
    this.selectedDifficulty = '';
    this.quizStarted = false;
    this.mostrarBienvenida = false;
  }

  selectDifficulty(difficulty: string) {
    this.selectedDifficulty = difficulty;
    this.currentQuestions =
      this.quizSections.find((s) => s.name === this.selectedSection)?.questions[
        difficulty as keyof (typeof this.quizSections)[0]['questions']
      ] || [];
    this.currentQuestion = 0;
    this.score = 0;
    this.userAnswers = [];
  }

  startTimer() {
    this.timer = 0;
    this.timerInterval = setInterval(() => {
      this.timer++;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  handleAnswer(selectedOption: number) {
    this.userAnswers[this.currentQuestion] = selectedOption;
    this.currentQuestion++;
    if (this.currentQuestion >= this.currentQuestions.length) {
      this.stopTimer();
      this.calculateScore();
    }
  }

  nextQuestion() {
    if (this.currentQuestion < this.currentQuestions.length - 1) {
      this.currentQuestion++;
    }
  }

  goBack() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  async calculateScore() {
    this.score = 0;
    for (let i = 0; i < this.currentQuestions.length; i++) {
      if (this.userAnswers[i] === this.currentQuestions[i].answer) {
        this.score++;
      }
    }

    const alert = await this.AlertController.create({
      header: 'Quiz Completado',
      message: `Tu puntaje: ${this.score} de ${
        this.currentQuestions.length
      }<br>Tiempo: ${this.formatTime(this.timer)}`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  restartQuiz() {
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }

  startQuiz() {
    this.quizStarted = true;
    this.startTimer();
  }

  endQuiz() {
    this.quizFinished = true;
    this.correctAnswersCount = 0;
    this.incorrectAnswers = [];

    // Detener el temporizador
    clearInterval(this.timerInterval);
    this.totalTime = this.timer; // Guardar el tiempo total transcurrido

    // Verificar respuestas del usuario
    this.currentQuestions.forEach((question, index) => {
      if (this.userAnswers[index] === question.answer) {
        this.correctAnswersCount++;
      } else {
        this.incorrectAnswers.push({
          question: question.question,
          userAnswer: question.options[this.userAnswers[index]],
          correctAnswer: question.options[question.answer],
        });
      }
    });

    // Mostrar mensajes dependiendo de los resultados
    if (this.correctAnswersCount === this.currentQuestions.length) {
      this.resultMessage =
        '¡Felicitaciones! Respondiste todas las preguntas correctamente.';
    } else if (this.correctAnswersCount >= this.currentQuestions.length / 2) {
      this.resultMessage =
        '¡Buen trabajo! Respondiste la mitad o más de las preguntas correctamente.';
    } else {
      this.resultMessage =
        '¡No te preocupes! La próxima vez será mejor. Sigue practicando.';
    }
  }
}
