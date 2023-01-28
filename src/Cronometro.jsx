import React from 'react';
let countDown;
export class Cronometro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tiempoDescanso : 5,
            tiempoSesion : 25,
            minutosSesion : 25,
            segundosSesion : '00',
            timerOn : false,
            pausa : false,
            estado : 'Sesion'
        };
        this.incDescanso = this.incDescanso.bind(this);
        this.decDescanso = this.decDescanso.bind(this);
        this.incSesion = this.incSesion.bind(this);
        this.decSesion = this.decSesion.bind(this);
        this.timer = this.timer.bind(this);
        this.displayTime = this.displayTime.bind(this);
        this.break = this.break.bind(this);
        this.resetTime = this.resetTime.bind(this);
    };


    incDescanso(){
        if (this.state.timerOn===false && this.state.tiempoDescanso<60) {
            this.setState({
                tiempoDescanso : parseInt(this.state.tiempoDescanso) + 1
            })
        }
    }

    decDescanso(){
        if (this.state.timerOn===false && this.state.tiempoDescanso > 1) {
            this.setState({
                tiempoDescanso : parseInt(this.state.tiempoDescanso) - 1
            })
        }
    }

    incSesion(){
        if (this.state.timerOn===false && this.state.tiempoSesion<60 && parseInt(this.state.tiempoSesion) < 9){
            this.setState({
                tiempoSesion : this.state.tiempoSesion + 1,
                minutosSesion : '0' + (parseInt(this.state.tiempoSesion) + 1),
                segundosSesion : '00' 
            })
        }else if (this.state.timerOn===false && this.state.tiempoSesion<60 && parseInt(this.state.tiempoSesion) >= 9) {
            this.setState({
                tiempoSesion : this.state.tiempoSesion +1,
                minutosSesion : parseInt(this.state.tiempoSesion) +1,
                segundosSesion : '00'
            })
        }
    }
    decSesion(){
        if (this.state.timerOn===false && this.state.tiempoSesion>1 && this.state.tiempoSesion <= 10){
            this.setState({
                tiempoSesion : this.state.tiempoSesion - 1,
                minutosSesion : '0' + (parseInt(this.state.tiempoSesion) - 1),
                segundosSesion : '00'
            })
        }else if (this.state.timerOn===false && this.state.tiempoSesion>1 && this.state.tiempoSesion > 10){
            this.setState({
                tiempoSesion : this.state.tiempoSesion -1,
                minutosSesion : this.state.tiempoSesion - 1,
                segundosSesion : '00'
            })
        }
    }
    
    timer() {
        if (this.state.timerOn===false){
            this.setState({
                timerOn : true
            });
            let segundos = parseInt(this.state.minutosSesion) * 60 + parseInt(this.state.segundosSesion);

            const now = Date.now();
            const despues = now + segundos * 1000;
            const time = 1000;
           
            countDown = setInterval(()=>{
            const segundosNuevo = Math.round((despues - Date.now())/1000);
            if(this.state.minutosSesion === "00" && this.state.segundosSesion === "00") {
                document.getElementById("beep").play();
              }
            if (segundosNuevo < 0) {
                clearInterval(countDown);
                this.break();
                return;
            }
            this.displayTime(segundosNuevo);
        },time)
        }else {
            clearInterval(countDown);
            let minutosPausa = this.state.minutosSesion;
            let segundosPausa = this.state.segundosSesion;
            this.setState({
                timerOn : false,
                minutosSesion : minutosPausa,
                segundosSesion : segundosPausa
            });
        }
    };

    displayTime(segundos) {
        const minRestantes = Math.floor(segundos/60);
        const segRestantes = segundos % 60;
        if (minRestantes >=9 && segRestantes >=9){
            this.setState({
                minutosSesion : minRestantes,
                segundosSesion : segRestantes
            })
        } else if (minRestantes < 9 && segRestantes < 9){
            this.setState({
                minutosSesion: '0' + minRestantes,
                segundosSesion : '0' + segRestantes
            })
        } else if (minRestantes >=9 && segRestantes <9){
            this.setState({
                minutosSesion : minRestantes,
                segundosSesion : '0' + segRestantes
            })
        } else {
            this.setState({
                minutosSesion : '0' + minRestantes,
                segundosSesion : segRestantes
            });
        }
    };

    break(){
        if(this.state.pausa === false) {
            if(this.state.tiempoDescanso > 9){
                this.setState({
                    estado : 'Descanso',
                    minutosSesion : this.state.tiempoDescanso,
                    segundosSesion : '00',
                    timerOn : false,
                    pausa : true
                },()=>{this.timer()});
            
            }else {
                this.setState({
                    estado : 'Descanso',
                    minutosSesion : '0' + this.state.tiempoDescanso,
                    segundosSesion : '00',
                    timerOn : false,
                    pausa : true
                },()=>{this.timer()});
               
            }
        }else {
            if (this.state.tiempoSesion > 9){
                this.setState({
                    estado : 'Sesion',
                    minutosSesion : this.state.tiempoSesion,
                    segundosSesion : '00',
                    timerOn : false,
                    pausa : false
                },()=>{this.timer()});
            }else {
                this.setState({
                    estado : 'Sesion',
                    minutosSesion : '0' + this.state.tiempoSesion,
                    segundosSesion : '00',
                    timerOn : false,
                    pausa : false
                },()=>{this.timer()});
            }
        }
    };

    resetTime(){
        clearInterval(countDown);
        this.setState({
            tiempoDescanso : 5,
            tiempoSesion : 25,
            minutosSesion : 25,
            segundosSesion : '00',
            timerOn : false,
            pausa : false,
            estado : 'Sesion'
        });
        document.getElementById("beep").currentTime = 0;
        document.getElementById("beep").pause();
    }

    render() {
        return (
            <div id='contenedor'>
            <div reloj>
            <div id='titulo'>
                <h4>CRONOMETRO RELOJERO</h4>
            </div>
            <div id='botones'>
            <div id='descanso-titulo'>
                DESCANSO
            <div id='descanso'>   
            <div
            id="incremento-descanso"
            className="material-icons"
            onClick={() => this.incDescanso()}
          >
            add_circle
          </div>
          <div id='mostrar-descanso'>
            {this.state.tiempoDescanso}
          </div>
          <div
            id="decremento-descanso"
            className="material-icons"
            onClick={() => this.decDescanso()}
          >
            remove_circle
          </div>
          </div>
          </div>
          <div id='sesion-titulo'>
            SESION
          <div id='sesion'>
          <div id='incremento-sesion'
          className='material-icons'
          onClick={() => this.incSesion()}
          >
            add_circle
          </div> 
          <div id='mostrar-sesion'>
            {this.state.minutosSesion}
          </div>
          <div id='decremento-sesion'
          className='material-icons'
          onClick={() => this.decSesion()}
          >
            remove_circle
          </div>
          </div>
          </div>
        </div>
        <div id='tiempo-titulo'>
            <h3>{this.state.estado}</h3>
        <div id='tiempo'>
            <audio id='beep' src="https://www.pacdv.com/sounds/interface_sound_effects/sound10.mp3" type="audio/mp3"></audio>
            {this.state.minutosSesion}:{this.state.segundosSesion}
        </div>
        </div>
        <div id='botones-tiempo'>
        <div id="start_stop"
        className="material-icons"
        onClick={() => this.timer()}
        >
                play_circle_filled
        </div>
        <div
                id="reset"
                className="material-icons"
                onClick={() => this.resetTime()}
              >
                replay
              </div>
        </div>
    </div>
</div>
        )
    };
};