
let latitude, longitude
let video
latLong()

function setup() {
    noCanvas()
    video = createCapture(VIDEO)
    video.size(320, 240)
    setDateTime(Date.now())
    
}
function latLong(){

    navigator.geolocation.getCurrentPosition((pos)=>{
        latitude = pos.coords.latitude
        longitude = pos.coords.longitude
        
        document.querySelector("#latitude").textContent = latitude
        document.querySelector("#longitude").textContent = longitude
 
    })
}

document.querySelector("#check-in").addEventListener("click", async ()=>{

    latLong()

    
    video.loadPixels()
    const image64 = video.canvas.toDataURL()

    
    const data = {
        timeStamp: Date.now(),
        mood: document.getElementById("mood").value,
        latitude: latitude,
        longitude: longitude,
        image64: image64
    }
    document.getElementById("mood").value=""
    const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)

    }
    const response = await fetch("/api",options)
    const text = await response.text()
    console.log(text)
})

function setDateTime(timeStamp){
    const d = new Date(timeStamp)
    const date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
    const time = `${d.getHours() > 12 ? d.getHours() % 12 :d.getHours() }:${d.getMinutes()}:${d.getSeconds()}`
    const ampm = d.getHours() > 12 ? "PM" : "AM"
   
    const dateTime = `${date} ${time} ${ampm}`

    document.querySelector("#date-time").textContent = dateTime
}


