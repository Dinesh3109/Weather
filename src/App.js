import React from 'react';
import Getkey from './components/Getkey';
import {Reset} from './components/Reset';
import './App.css';
import './style/grid.css';



export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      temperature:'',
      forcasting:'',
      isTemp:false,
      isForcast:false
    }
    this.getTemperature=this.getTemperature.bind(this);
    this.getForcast=this.getForcast.bind(this);
    this.reset=this.reset.bind(this);
  }

  async getTemperature(cityKey){
    const url ='http://dataservice.accuweather.com/currentconditions/v1/'+cityKey+'?apikey=P9iZNNkz3ScD9GigwNZ2SsHDA9ous8kF';
    await fetch(url).then((response)=>response.json()).then((findresponse)=>{
     this.setState({
      temperature: {
        WeatherText : findresponse[0].WeatherText,
        celsius:findresponse[0].Temperature.Metric.Value,
        unit: findresponse[0].Temperature.Metric.Unit
      },
      isTemp:true,
      isForcast:false

     })
    });

  }

  reset(){
    this.setState({
      isTemp:false,
      isForcast:false
    })
  }
  async getForcast(cityKey){
    const url ='http://dataservice.accuweather.com/forecasts/v1/daily/5day/'+cityKey+'?apikey=P9iZNNkz3ScD9GigwNZ2SsHDA9ous8kF';
    await fetch(url).then((response)=>response.json()).then((findresponse)=>{
     this.setState({
      forcasting: findresponse.DailyForecasts ,
      isTemp:false,
      isForcast:true

     })
    });
  }
 

  render(){
    return(
        <div>
          <Getkey getTemperature={this.getTemperature} getForcast={this.getForcast} isTemp={this.state.isTemp}/>
            {(this.state.isTemp) && 
              <div className="container">
                  <p className="weatherinfo">The Weather is <strong> {this.state.temperature.WeatherText} </strong> and The Temperature is 
                  <strong> {this.state.temperature.celsius} </strong><span>&#176;</span>
                  <strong> {this.state.temperature.unit}</strong></p>  
                  <div className="col span-1-of-3">
                  <Reset reset={this.reset}/>
                  </div>
              </div>
            }
            {(this.state.isForcast) && 
              <div className="container-forcasting">
                  <div>
                    {this.state.forcasting.map((daily)=>(
                      <div className="column span-1-of-5 ">
                            <figure className="weather">
                              <div className="weather__content">
                                <div className="weather__title">
                                  <h1 className="weather__heading">{daily.Date.slice(0,10)}</h1>
                                 
                                </div>
                                <p className="weather__description">Maximum: <strong>{daily.Temperature.Maximum.Value}<span>&#176;</span>{daily.Temperature.Maximum.Unit}</strong></p>
                                <p className="weather__description">Minimum: <strong>{daily.Temperature.Minimum.Value}<span>&#176;</span>{daily.Temperature.Minimum.Unit}</strong></p>
                                <p className="weather__description">Day: <strong>{daily.Day.IconPhrase}</strong></p>
                                <p className="weather__description">Night: <strong>{daily.Night.IconPhrase}</strong></p>
                              
                              </div>
                          </figure>
                      
                      </div>
                    ))}
                  </div>
                 <Reset reset={this.reset}/>
              </div>
            }
        </div>

    )
  }
}


