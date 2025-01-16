

async function getData(){

    const response = await fetch("/api")
    const data = await response.json()
    
console.log(data)
    for( const items of data ){
        const mood = document.createElement("div")
        const latlong = document.createElement("div")
        const dateTime = document.createElement("div")
        const image = document.createElement("img")
        const container = document.createElement("div")
       
        mood.textContent=`mood: ${items.mood}`
        latlong.textContent =`${items.latitude}°, ${items.longitude}°`
        dateTime.textContent = getDateTime(items.timeStamp)
        image.src = items.image64
        container.className="container"
        container.append(mood,latlong,dateTime,image)
       

        document.body.append(container)
        
        


    }
}
function getDateTime(timeStamp){
    const d = new Date(timeStamp)
    const date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
    const time = `${d.getHours() > 12 ? d.getHours() % 12 :d.getHours() }:${d.getMinutes()}:${d.getSeconds()}`
    const ampm = d.getHours() > 12 ? "PM" : "AM"
   
    const dateTime = `${date} ${time} ${ampm}`
    return dateTime
}

getData()