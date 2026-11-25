const cityLocations = [
  {name:'Chicago', collection:'/chicago', building:'Sears Tower', position:[-87.636,41.879], offset:[-38,9], icon:'sears'},
  {name:'Detroit', building:'Renaissance Center', position:[-83.039,42.329], offset:[4,-30], icon:'ren'},
  {name:'New York', building:'Empire State Building', position:[-73.986,40.748], offset:[11,25], icon:'empire'},
  {name:'Boston', building:'Custom House Tower', position:[-71.053,42.359], offset:[68,-25], icon:'custom'}
];
const radians = Math.PI/180;
const homeLongitude = -96.5;
// The opening camera sits 45° south of the map center at 38.5° N.
const homeLatitude = -6.5;
const landmarkIcons = {
  "sears": {
    "src": "/globe/chicago.webp",
    "aspect": 0.39919,
    "imageWidth": 258.586,
    "imageLeft": -83.838,
    "imageTop": -0.202,
    "height": 158
  },
  "ren": {
    "src": "/globe/detroit.webp",
    "aspect": 0.98488,
    "imageWidth": 111.842,
    "imageLeft": -7.018,
    "imageTop": -3.888,
    "height": 112
  },
  "empire": {
    "src": "/globe/new-york.webp",
    "aspect": 0.42052,
    "imageWidth": 244.976,
    "imageLeft": -78.469,
    "imageTop": -0.201,
    "height": 158
  },
  "custom": {
    "src": "/globe/boston.webp",
    "aspect": 0.48185,
    "imageWidth": 214.226,
    "imageLeft": -50.628,
    "imageTop": -0.403,
    "height": 137
  }
};

export function mountGlobe(root) {
  const $ = (selector) => root.querySelector(selector);
  const controller = new AbortController();
  const listen = (target, event, handler) => target.addEventListener(event, handler, {signal: controller.signal});
  const stage = $('.stage');
  const canvas = $('#globe');
  const guides = $('#guides');
  const ctx = canvas.getContext('2d');
  const g = guides.getContext('2d');
  const map = document.createElement('canvas');
  const mapContext = map.getContext('2d', {willReadFrequently:true});
  let texture, width, height, centerX, centerY, radius, sphere, pixels, small;
  let lon=homeLongitude, lat=homeLatitude, zoom=1, selected=null, frame=0, drag;
  // Coastlines and lakes from Natural Earth via World Atlas. U.S. outline from U.S. Census Bureau via U.S. Atlas.
  const textureImage = new Image();
  textureImage.onload = () => {
    map.width = textureImage.width;
    map.height = textureImage.height;
    mapContext.drawImage(textureImage,0,0);
    texture = mapContext.getImageData(0,0,map.width,map.height).data;
    schedule();
  };
  textureImage.src = '/globe/world.png';



  const cities = cityLocations.map(location => ({...location}));

  for (const city of cities) {
    const item = makeCityControl(city, false);
    item.className = 'marker';
    item.setAttribute('aria-label',city.name+' · '+city.building);
    item.hidden = true;
    const icon = landmarkIcons[city.icon];
    const artwork = document.createElement('span');
    artwork.className = 'landmark-art';
    artwork.style.setProperty('--landmark-aspect',icon.aspect);
    artwork.style.setProperty('--image-width',icon.imageWidth+'%');
    artwork.style.setProperty('--image-left',icon.imageLeft+'%');
    artwork.style.setProperty('--image-top',icon.imageTop+'%');
    const image = document.createElement('img');
    image.src = icon.src;
    image.alt = '';
    image.draggable = false;
    artwork.append(image);
    const label = document.createElement('span');
    label.className = 'marker-label';
    label.textContent = city.name;
    item.append(artwork,label);
    $('#markers').append(item);
    const shortcut = makeCityControl(city, true);
    shortcut.textContent = city.name;
    $('#cities').append(shortcut);
    city.item = item;
    city.shortcut = shortcut;
  }

  function makeCityControl(city, recenter) {
    if (city.collection) {
      const link = document.createElement('a');
      link.href = city.collection;
      return link;
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-pressed', 'false');
    listen(button, 'click', () => select(city, recenter));
    return button;
  }

  function select(city,recenter) {
    selected = city;
    $('#selection').hidden = !city;
    if(city){
      $('#selection strong').textContent = city.name;
      $('#selection span').textContent = city.building + ' · Collection coming soon';
      if(recenter){
        const point = project(...city.position);
        if(point.depth<.25 || point.x<42 || point.x>width-85 || point.y<110 || point.y>height-70) resetView();
      }
    }
    for(const entry of cities){
      if (entry.collection) continue;
      entry.item.setAttribute('aria-pressed',String(entry===city));
      entry.shortcut.setAttribute('aria-pressed',String(entry===city));
    }
    schedule();
  }

  function project(longitude,latitude){
    const delta=(longitude-lon)*radians, phi=latitude*radians, origin=lat*radians;
    const x=Math.cos(phi)*Math.sin(delta);
    const y=Math.cos(origin)*Math.sin(phi)-Math.sin(origin)*Math.cos(phi)*Math.cos(delta);
    const depth=Math.sin(origin)*Math.sin(phi)+Math.cos(origin)*Math.cos(phi)*Math.cos(delta);
    return {x:centerX+radius*x,y:centerY-radius*y,depth};
  }

  function resize(){
    width=stage.clientWidth;
    height=stage.clientHeight;
    small=width<=700;
    centerX=width*(small?.43:.56);
    const scale=Math.min(1,900/width);
    canvas.width=Math.round(width*scale);
    canvas.height=Math.round(height*scale);
    const dpr=Math.min(window.devicePixelRatio||1,2);
    guides.width=Math.round(width*dpr);
    guides.height=Math.round(height*dpr);
    g.setTransform(guides.width/width,0,0,guides.height/height,0,0);
    for(const city of cities){
      const icon = landmarkIcons[city.icon];
      city.item.style.setProperty('--landmark-height',icon.height*(small?.55:1)+'px');
    }
    createSphere();
    schedule();
  }

  function createSphere() {
    const baseRadius=small ? width*1.15 : Math.min(width*1.03,height*1.78);
    radius=baseRadius*zoom;
    centerY=height*(small?.66:.56)+Math.SQRT1_2*radius;
    const w=canvas.width, h=canvas.height;
    sphere=new Float32Array(w*h*4);
    pixels=ctx.createImageData(w,h);
    for(let y=0;y<h;y++){
      const sy=(centerY-(y+.5)*height/h)/radius;
      for(let x=0;x<w;x++){
        const sx=((x+.5)*width/w-centerX)/radius;
        const distance=sx*sx+sy*sy;
        if(distance>=1) continue;
        const i=(y*w+x)*4, z=Math.sqrt(1-distance);
        sphere[i]=sx;
        sphere[i+1]=sy;
        sphere[i+2]=z;
        sphere[i+3]=Math.min(1,(1-Math.sqrt(distance))*radius*.8);
      }
    }
  }

  function paintSphere(){
    if(!texture) return;
    const data=pixels.data, cos=Math.cos(lat*radians), sin=Math.sin(lat*radians);
    const uOffset=lon/360+.5, invTurn=1/(2*Math.PI);
    for(let i=0;i<sphere.length;i+=4){
      const alpha=sphere[i+3];
      if(!alpha) continue;
      const x=sphere[i], y=sphere[i+1], z=sphere[i+2];
      let u=Math.atan2(x,z*cos-y*sin)*invTurn+uOffset;
      u-=Math.floor(u);
      const v=.5-Math.asin(Math.min(1,Math.max(-1,y*cos+z*sin)))/Math.PI;
      const sample=(Math.min(map.height-1,Math.floor(v*map.height))*map.width+Math.floor(u*map.width))*4;
      const light=.985+.014*z-.004*x+.004*y;
      data[i]=texture[sample]*light;
      data[i+1]=texture[sample+1]*light;
      data[i+2]=texture[sample+2]*light;
      data[i+3]=255*alpha;
    }
    ctx.putImageData(pixels,0,0);
  }

  function paintMarkers() {
    g.clearRect(0,0,width,height);
    for(const city of cities){
      const p=project(...city.position);
      const spread=small?.66:1;
      const pointX=p.x+city.offset[0]*spread;
      const pointY=p.y+city.offset[1]*spread;
      const inset=Math.max(42,city.item.offsetWidth/2+8);
      const x=Math.max(inset,Math.min(width-inset,pointX));
      const y=Math.max(small?245:174,pointY);
      city.item.hidden=p.depth<.15||p.x<0||p.x>width||p.y<70||p.y>height-45||y>height-57;
      if(city.item.hidden) continue;
      city.item.style.left=x+'px';
      city.item.style.top=y+'px';
      if(city!==selected) continue;
      g.strokeStyle='#903d2e';
      g.lineWidth=1.5;
      g.beginPath();
      g.moveTo(p.x,p.y);
      g.lineTo(x,y-10);
      g.stroke();
      g.beginPath();
      g.arc(p.x,p.y,3.4,0,Math.PI*2);
      g.fillStyle='#903d2e';
      g.fill();
    }
  }

  function schedule(){
    if(frame) return;
    frame=requestAnimationFrame(()=>{
      frame=0;
      paintSphere();
      paintMarkers();
    });
  }
  function zoomBy(change){
    zoom=Math.max(.69,Math.min(1.45,zoom+change));
    $('#in').disabled=zoom>=1.45;
    $('#out').disabled=zoom<=.69;
    createSphere();
    schedule();
  }
  function resetView(){
    lon=homeLongitude;
    lat=homeLatitude;
    zoom=1;
    zoomBy(0);
  }

  listen(canvas,'pointerdown',e=>{
    if(!e.isPrimary || e.button!==0) return;
    drag={id:e.pointerId,x:e.clientX,y:e.clientY,lon,lat};
    canvas.setPointerCapture(e.pointerId);
  });
  listen(canvas,'pointermove',e=>{
    if(!drag || e.pointerId!==drag.id) return;
    lon=drag.lon-(e.clientX-drag.x)*68/radius;
    lat=Math.max(-78,Math.min(78,drag.lat+(e.clientY-drag.y)*68/radius));
    schedule();
  });
  for(const event of ['lostpointercapture','pointercancel','pointerup']) listen(canvas,event,()=>{drag=null;});
  listen(canvas,'keydown',e=>{
    const moves={ArrowLeft:[-6,0],ArrowRight:[6,0],ArrowUp:[0,6],ArrowDown:[0,-6]};
    if(moves[e.key]){
      lon+=moves[e.key][0];
      lat=Math.max(-78,Math.min(78,lat+moves[e.key][1]));
      schedule();
    }else if(e.key==='+'||e.key==='=') zoomBy(.15);
    else if(e.key==='-') zoomBy(-.15);
    else if(e.key==='Home') resetView();
    else return;
    e.preventDefault();
  });
  listen($('#in'),'click',()=>zoomBy(.15));
  listen($('#out'),'click',()=>zoomBy(-.15));
  listen($('#reset'),'click',resetView);
  listen($('#dismiss'),'click',()=>{
    const current=selected;
    select(null,false);
    if(current) (current.item.hidden?current.shortcut:current.item).focus();
  });
  listen($('#about-link'),'click',event=>{
    event.preventDefault();
    $('#about').showModal();
  });
  resize();
  const observer=new ResizeObserver(resize);
  observer.observe(stage);
  return () => {
    controller.abort();
    observer.disconnect();
    cancelAnimationFrame(frame);
    textureImage.onload=null;
    $('#markers').replaceChildren();
    $('#cities').replaceChildren();
  };
}
