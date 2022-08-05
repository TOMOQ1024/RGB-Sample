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
    _ctx.font = `bold ${Math.min(w/2,h/3)}px gothic`;
    _ctx.textAlign = "left";
    _ctx.textBaseline = "middle";
    let gd = _ctx.createLinearGradient(0, h/3, 0, h*2/3);
    gd.addColorStop(0.0, "#fd0");
    gd.addColorStop(1.0, "#f80");
    _ctx.fillStyle = gd;
    _ctx.fillText("三原色", 0, h/2);
    _ctx.globalCompositeOperation = "lighter";
    _ctx.fillStyle = "#f00";
    
    let x0 = w * .75;
    let y0 = h/2;
    let r = Math.min(w/4,h/5);
    _ctx.beginPath();
    _ctx.arc(
      x0-r/2*Math.sin(Math.PI/3*0),
      y0-r/2*Math.cos(Math.PI/3*0),
      r, 0, Math.PI*2);
    _ctx.fill();
    _ctx.fillStyle = "#0f0";
    _ctx.beginPath();
    _ctx.arc(
      x0-r/2*Math.sin(Math.PI/3*2),
      y0-r/2*Math.cos(Math.PI/3*2),
      r, 0, Math.PI*2);
    _ctx.fill();
    _ctx.fillStyle = "#00f";
    _ctx.beginPath();
    _ctx.arc(
      x0-r/2*Math.sin(Math.PI/3*4),
      y0-r/2*Math.cos(Math.PI/3*4),
      r, 0, Math.PI*2);
    _ctx.fill();
    _imgData = _ctx.getImageData(0, 0, w, h);
    _pixels = _imgData.data;

    let i, j;
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


  cvs.addEventListener("click", (e)=>{
    d=0;
    let mx = e.clientX;
    let my = e.clientY;
    if(itvl)clearInterval(itvl);
    itvl = setInterval(()=>{
      for(let y=0; y<h; ++y){
        for(let x=0; x<w; ++x){
          i = x*4+y*w*4;
          j = Math.floor(Math.min((Math.floor(x/(d**3+1))*(d**3+1)-mx)/(d**3+1)+mx,w-1))*4
            + Math.floor(Math.min((Math.floor(y/(d**3+1))*(d**3+1)-my)/(d**3+1)+my,h-1))*w*4;
          if(!_pixels[j+3]){
            pixels[i+0] = (Math.floor(x/(d**3+1))+3)%3 ? 0 : 255;
            pixels[i+1] = (Math.floor(x/(d**3+1))+2)%3 ? 0 : 255;
            pixels[i+2] = (Math.floor(x/(d**3+1))+1)%3 ? 0 : 255;
          }
          else{
            pixels[i+0] = (Math.floor(x/(d**3+1))+3)%3 ? 0 : _pixels[j+0];
            pixels[i+1] = (Math.floor(x/(d**3+1))+2)%3 ? 0 : _pixels[j+1];
            pixels[i+2] = (Math.floor(x/(d**3+1))+1)%3 ? 0 : _pixels[j+2];
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      if((d+=0.01) > 4)clearInterval(itvl);
    }, 1000/60);
  });
});
