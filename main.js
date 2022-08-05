let cvs, _cvs, ctx, _ctx, imgData, _imgData, pixels, _pixels, w, h, itvl;
      
window.addEventListener("load", ()=>{
  cvs = document.querySelector("canvas");
  _cvs = document.createElement("canvas");
  w = window.innerWidth;
  _cvs.width = w;
  cvs.width = w;
  h = window.innerHeight;
  _cvs.height = h;
  cvs.height = h;
  ctx = cvs.getContext("2d");
  _ctx = _cvs.getContext("2d");
  imgData = ctx.createImageData(w, h);
  pixels = imgData.data;
  //document.body.append(cvs);
        
  pixels.forEach((v,i)=>{if(i%4==3)pixels[i]=255});
        
  (function(){
    _ctx.font = `bold ${Math.min(w/3,h/4)}px gothic`;
    _ctx.textAlign = "center";
    _ctx.textBaseline = "bottom";
    let gd = _ctx.createLinearGradient(0, 0, 0, h/4);
    gd.addColorStop(0.0, "#fd0");
    gd.addColorStop(1.0, "#f80");
    _ctx.fillStyle = gd;
    _ctx.fillText("三原色", w/2, h/4);
    _ctx.globalCompositeOperation = "lighter";
    _ctx.fillStyle = "#f00";
    _ctx.beginPath();
    _ctx.arc(w/2, h/2, w/4, 0, Math.PI*2);
    _ctx.fill();
    _ctx.fillStyle = "#0f0";
    _ctx.beginPath();
    _ctx.arc(w/3, h*2/3, w/4, 0, Math.PI*2);
    _ctx.fill();
    _ctx.fillStyle = "#00f";
    _ctx.beginPath();
    _ctx.arc(w*2/3, h*2/3, w/4, 0, Math.PI*2);
    _ctx.fill();
    _imgData = _ctx.getImageData(0, 0, w, h);
    _pixels = _imgData.data;
    
    let i;
     for(let y=0; y<h; ++y){
       for(let x=0; x<w; ++x){
         i = x*4+y*w*4;
         if(!_pixels[i+3]){
           pixels[i+0] = (x+3)%3 ? 0 : 255;
           pixels[i+1] = (x+2)%3 ? 0 : 255;
           pixels[i+2] = (x+1)%3 ? 0 : 255;
         }
         else{
           pixels[i+0] = (x+3)%3 ? 0 : _pixels[i+0];
           pixels[i+1] = (x+2)%3 ? 0 : _pixels[i+1];
           pixels[i+2] = (x+1)%3 ? 0 : _pixels[i+2];
         }
       }
     }
    ctx.putImageData(imgData, 0, 0);
  }());
        
        
  cvs.addEventListener("click", ()=>{
    return;
    d=0;
    if(itvl)clearInterval(itvl);
    itvl = setInterval(()=>{
      for(let y=0; y<h; ++y){
        for(let x=0; x<w; ++x){
          i = x*4+y*w*4;
          pixels[i+0] = (x+3)%3 ? 0 : _pixels[i+0];
          pixels[i+1] = (x+2)%3 ? 0 : _pixels[i+1];
          pixels[i+2] = (x+1)%3 ? 0 : _pixels[i+2];
          break;
          pixels[i+0] = (Math.floor(x/(d**3+1))+3)%3 ? 0 : 255;
          pixels[i+1] = (Math.floor(x/(d**3+1))+2)%3 ? 0 : 255;
          pixels[i+2] = (Math.floor(x/(d**3+1))+1)%3 ? 0 : 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);

      if((d+=0.01) > 4)clearInterval(itvl);
    }, 1000/60);
  });
});
