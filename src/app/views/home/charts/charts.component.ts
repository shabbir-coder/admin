import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {

  @Input() sets:any
  @ViewChild('chartRef') chartRef: any

  selectedSet: number;

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  chartLineData = {
    labels: [...this.months],
    datasets: [] as any
  };

  chartLineOptions = {
    maintainAspectRatio: false,
    responsive: true
  };

  
  get randomData() {
    return Math.round(Math.random() * 80);
  }

  updatingChart = false;
  dataAvailable = false;
  setSelected(event: any){
    console.log(event)
    const randomColor = this.getRandomColor
    this.chartLineData.datasets.push(
      {
        label: event?.setName,
        backgroundColor: randomColor,
        borderColor: randomColor,
        pointBackgroundColor: randomColor,
        pointBorderColor: '#fff',
        data: Array.from({ length: 12 }, () => this.randomData),
        tension: 0.4
      }
    )
    this.dataAvailable = true;
    this.updateChart();
  }

  removeSelected(event: any){
    console.log(event)
    this.chartLineData.datasets = this.chartLineData.datasets.filter((ele:any)=> ele.label != event.setName)
    if(this.chartLineData.datasets.length<1){
      this.dataAvailable = false;
    }
    this.updateChart();
  }

  get getRandomColor() {
    const red = Math.floor(Math.random() * 256); // Random value between 0 and 255
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
  
    const color = `rgba(${red}, ${green}, ${blue})`;
  
    return color;
  }

  updateChart(){
    this.chartRef.chart.update();
    this.updatingChart = true;
    setTimeout(() => {
      this.updatingChart = false;
    }, 3000);
  }

  downloadFunc(){
   console.log('download'); 
  }
}
