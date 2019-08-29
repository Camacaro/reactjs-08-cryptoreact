import React, { Component } from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import axios from 'axios';
import Resultado from './componentes/Resultado';

class App extends Component {

	state = {
		monedas:[],
		cotizacion:{},
		monedaCotizada:'',
		cargando:false
	}
	
	async componentDidMount(){
		this.obtenerMonedas();
	}

	obtenerMonedas = async () => {
		const url = `https://api.coinmarketcap.com/v2/ticker`;

		await axios.get(url)
			.then(respuesta => {
				this.setState({
					monedas:respuesta.data.data
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	/** Cotizar una crypto en base a una moneda */
	obtenerValoresCrypto = async (monedas) => {

		const {moneda, cripto} = monedas;

		const url  = `https://api.coinmarketcap.com/v2/ticker/${cripto}/?convert=${moneda}`;

		/**Aqui va en la vida real, antes de cargar la peticion, para que aparezca el mensaje de cargando */
		/*this.setState({
			cargando:true
		});*/

		var config = {
			headers: {'Access-Control-Allow-Origin': '*'}
		};

		await axios.get(url, config)
			.then(respuesta => {
				/**Esto va con la vida real */
				/*this.setState({
					cotizacion: respuesta.data.data,
					monedaCotizada: moneda,
					cargando:false
				});*/

				this.setState({
					cargando:true
				});

				/**Simular que esta tardando la peticion */
				setTimeout(() => {
					this.setState({
						cotizacion: respuesta.data.data,
						monedaCotizada: moneda,
						cargando:false
					});
				}, 3000);
			})
			.catch(err => {
				console.log(err);
			});
	}
	
	render() {

		const cargando = this.state.cargando;

		let resultado;

		if(cargando){
			resultado = <div className="spinner">
							<div className="rect1"></div>
							<div className="rect2"></div>
							<div className="rect3"></div>
							<div className="rect4"></div>
							<div className="rect5"></div>
						</div>
		}else{
			resultado = <Resultado
							cotizacion = {this.state.cotizacion}
							monedaCotizada = {this.state.monedaCotizada}
						/>		
		}


		return (
			<div className="container">
				<Header
					titulo="Cotiza Criptomonedas al Instante"
				/>

				<div className="row justify-content-center">
					<div className="col-md-6 bg-light pb-4 contenido-principal">
						<Formulario
							monedas = {this.state.monedas}
							obtenerValoresCrypto = {this.obtenerValoresCrypto}
						/>

						{resultado}
					</div>
				</div>
				
			</div>
		);
	}
}

export default App;
