// fluid.js Canvas流体拖尾特效
export function initFluidTail() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let points = [];
    const maxPoints = 40;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    window.addEventListener("mousemove", (e) => {
        points.push({ x: e.clientX, y: e.clientY, life:1.0 });
        if(points.length > maxPoints) points.shift();
    });

    function render(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(let i=0;i<points.length;i++){
            const p = points[i];
            p.life -= 0.025;
            if(p.life <=0) continue;
            ctx.beginPath();
            ctx.arc(p.x,p.y, 8 * p.life,0,Math.PI*2);
            ctx.fillStyle = `rgba(80,160,255, ${p.life*0.45})`;
            ctx.fill();
        }
        points = points.filter(p=>p.life>0);
        requestAnimationFrame(render);
    }
    render();
}
