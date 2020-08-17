class Header extends React.Component{
    
    render(){
        return(
            <header className="card-panel teal lighten-2">
                <h1 className="headerTitle">{this.props.title}</h1>
                <button className="waves-effect waves-light btn-large">PredTaper</button>
            </header>
        );
    }
}

class PredTaper extends React.Component{

    state = {
        totalTabs: 0
    }

    handleTaperCalc = (initial, decAmount, dayInterval) => {
        let totalMG = 0;

        for(let i = initial; i > 0; i-= decAmount)
            for(let j = 0; j < dayInterval; j++)
                totalMG+= parseFloat(i);

        this.setState({totalTabs: Math.ceil(totalMG/5)});
    }

    handleGenerateCalendar = (initial, decAmount, dayInterval) => {
        let currentDate = new Date();
        let dayAmounts = {};

        for(let i = initial; i > 0; i-= decAmount)
            for(let j = 0; j < dayInterval; j++){
                let properMonth = parseInt(currentDate.getMonth())+1;
                let date = currentDate.getFullYear() + "-" + properMonth + "-" + currentDate.getDate(); 
                currentDate.setDate(currentDate.getDate() + 1);
                dayAmounts[date] = parseFloat(i)/5;
            } 
                
        generateCal(dayAmounts, "Prednisone 5mg"); 
        for(var day in dayAmounts)
            console.log("Date: " + day + " Amount: " + dayAmounts[day]);  
    }

    render(){
        return(
            <div className = "predtaper-main">
                <PredTaperInput
                    calculateTaper = {this.handleTaperCalc}
                    generateCalendar= {this.handleGenerateCalendar}
                />
                <PredTaperOutput
                    totalTabs = {this.state.totalTabs}
                />
            </div>
        ); 
    }
}

class PredTaperInput extends React.Component{

    render(){
        return(
            <div className = "predtaper-input card-panel">
                <h1 className="componentTitle">Prednisone Taper Calculator</h1>
                <div className="row">
                    <form className="cols12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="initial" type="text"/>
                                <label for="initial">Initial Milligrams</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="decAmount" type="text"/>
                                <label for="decAmount">Decreasing Amount(mg)</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="dayInterval" type="text"/>
                                <label for="dayInterval">Days Between Decrements</label>
                            </div>
                        </div>
                    </form>
                    <div className="componentButtonAlignment">
                    <button className="btn waves-effect waves-light z-depth-2" id="calculateTaper-button" 
                    onClick={() => this.props.calculateTaper(
                        document.getElementById("initial").value,
                        document.getElementById("decAmount").value,
                        document.getElementById("dayInterval").value)}>Calculate Taper</button>
                    <button className="btn waves-effect waves-light" id="generateCalendar-button" 
                    onClick={() => this.props.generateCalendar(
                        document.getElementById("initial").value,
                        document.getElementById("decAmount").value,
                        document.getElementById("dayInterval").value)}>Generate Calendar <i className="material-icons small">file_download</i></button>
                </div>
                </div>
            </div>     
        ); 
    }
}

class PredTaperOutput extends React.Component{

    render(){
        return(
            <div className = "predtaper-output card-panel">
                <h2>Total Tablets: {this.props.totalTabs} (5mg tabs)</h2>
            </div>
        );
    }
}

class App extends React.Component{

    render(){
        return(
            <div className = "mainScreen">
                <Header
                    title = "pharmASSIST"
                />
                <PredTaper/>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);


function generateCal(taperDays, drugName) {
    const HEIGHT = 28 ,WIDTH = 32, OFFSETX = 27, OFFSETY = 36;
    var doc = new jsPDF('l');
    let docWidth = doc.internal.pageSize.width;

    let firstDate = new Date(Object.keys(taperDays)[0]);
    let lastDate = new Date(Object.keys(taperDays)[Object.keys(taperDays).length-1]);
    let currentDate = firstDate;
    let currentMonth = parseInt(currentDate.getMonth());
    let numberOfMonths = (parseInt(lastDate.getMonth()) - parseInt(firstDate.getMonth())) + 1;
    let months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    let days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    let monthOffset = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0);
    
    for(let k = 0; k < numberOfMonths; k++){
        //Find all tablet information for current month
        let currentMonthsTabs = {};
        for(var day in taperDays){
            let tempDay = new Date(day);
            if(tempDay.getMonth() == currentDate.getMonth() && tempDay.getFullYear() == currentDate.getFullYear()){ //+1 to account for month (0-11)
                currentMonthsTabs[tempDay.getDate()] = taperDays[day];
            }
        }

        let currentDay = 1;

        for(let i = 0; i < 6; i++){
            for(let j = 0; j < 7; j++){
                doc.rect(j*WIDTH+OFFSETX, i*HEIGHT+OFFSETY, WIDTH, HEIGHT);
    
                doc.setFontSize(20);
                doc.setFontStyle("bold");
    
                if(i == 0 && j >= monthOffset){
                    doc.text(currentDay.toString(),j*WIDTH+OFFSETX+1,i*HEIGHT+OFFSETY+8);
    
                    if(Object.keys(currentMonthsTabs).includes(currentDay.toString())){
                        doc.setFontSize(40);
                        doc.text(currentMonthsTabs[currentDay].toString(),j*WIDTH+OFFSETX+16,i*HEIGHT+OFFSETY+20, "center");
                    }
                    currentDay++;
                }
                if(i > 0 && currentDay <= lastDay.getDate()){
                    doc.text(currentDay.toString(),j*WIDTH+OFFSETX+1,i*HEIGHT+OFFSETY+8);
    
                    if(Object.keys(currentMonthsTabs).includes(currentDay.toString())){
                        doc.setFontSize(40);
                        doc.text(currentMonthsTabs[currentDay].toString(),j*WIDTH+OFFSETX+16,i*HEIGHT+OFFSETY+20, "center");
                    }
                    currentDay++;
                }
            }
        }
    
        doc.rect(OFFSETX,OFFSETY-10,(WIDTH*7),10,"DF");
    
        doc.setFontSize(12);
        doc.setTextColor("#FFFFFF");
        for(let i = 0; i < 7; i++){
            doc.text(days[i], i*WIDTH+OFFSETX+(WIDTH/2), OFFSETY-3.5, "center");
        }
    
        doc.setFontSize(35);
        doc.setFontStyle("bold");
        doc.setTextColor("#0074D9");
    
        doc.text(months[currentDate.getMonth()] + " " + currentDate.getFullYear(), OFFSETX, 19);

        doc.setFontStyle("none");
        doc.setTextColor("000000");
        doc.text(drugName, docWidth-(OFFSETX*2)+5, 19, "right");
        doc.setFontSize(10);
        doc.setFontStyle("italic");
        doc.text("NOTE: Large numbers represent amount of TABLETS to take.", docWidth-(OFFSETX*2)+5, 25, "right");

    
        if((k+1) < numberOfMonths){
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1);
            monthOffset = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
            lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0);
            doc.setTextColor("#000000");
            doc.addPage();
        }
    }

    doc.save("taperCalendar.pdf");
}
