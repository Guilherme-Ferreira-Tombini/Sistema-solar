export default function ToggleDetails(element:any){
    if (element.style.display === "block") {
        element.style.display = "none";
      } else {
        element.style.display = "block";
        element.style.position = "absolute";
      }
  }   