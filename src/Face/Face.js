import React, { Component } from 'react';

class Face extends Component {

	constructor(props){
		super(props);
	    this.drawGradient = this.drawGradient.bind(this);
	    this.moveFaceToMouse = this.moveFaceToMouse.bind(this);
	    this.updateCanvas = this.updateCanvas.bind(this);
	    this.calculateFaceToMouseNewCords = this.calculateFaceToMouseNewCords.bind(this);
	    this.state = {
	    	faceX:this.props.width/2,
	    	faceY:this.props.height/2,
	    	faceDesiredX: 0,
	    	faceDesiredY: 0
	    }
	}

	componentDidMount(){
		document.addEventListener('mousemove', this.calculateFaceToMouseNewCords, false);
		setInterval(()=>{this.updateCanvas()},50);	
	}
	componentDidUpdate(){
		if(this.state.faceX === 0 && this.state.faceY ===0){
		    this.setState({
		    	faceX:this.props.width/2,
		    	faceY:this.props.height/2
		    });
	    }

	}

    calculateFaceToMouseNewCords(evt){
	    const maxDistanceTraveled = 100;
	    let distanceToMouse  =Math.sqrt(evt.clientX*evt.clientX + evt.clientY * evt.clientY);
	    if(distanceToMouse>maxDistanceTraveled){
	    	let ratio = maxDistanceTraveled/distanceToMouse;
	    	this.setState({
		    	faceDesiredX:this.props.width/2 + (ratio * (evt.clientX-this.props.width/2)),
		    	faceDesiredY:this.props.height/2 + (ratio * (evt.clientY-this.props.height/2))
	    	});
	    }
    }
    moveFaceToMouse(){
    	const speed = 40;
	    let distanceToPoint  =Math.sqrt(this.state.faceDesiredX*this.state.faceDesiredX + 
	    								this.state.faceDesiredY * this.state.faceDesiredY);
	    if(distanceToPoint>speed){
	    	let ratio = speed/distanceToPoint;
	    	this.setState({
		    	faceX:this.state.faceX + (ratio * (this.state.faceDesiredX-this.state.faceX)),
		    	faceY:this.state.faceY + (ratio * (this.state.faceDesiredY-this.state.faceY))
	    	});
	    }

    }

    drawFace(centerX,centerY){
		const ctx = this.refs.canvas.getContext('2d');
		const radius = 100;
		const eyeDistanceX = 200;
		const eyeHeight= 20;
		const eyeRadius = 15;
		ctx.beginPath();
		ctx.arc(centerX, centerY-radius/2, radius*2,.3 * Math.PI , .7 * Math.PI, false);
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'black';
		ctx.stroke();	

		ctx.beginPath();
		ctx.arc(centerX+eyeDistanceX/2, centerY-eyeHeight,eyeRadius, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'black';
		ctx.fill();

		ctx.beginPath();
		ctx.arc(centerX-eyeDistanceX/2, centerY-eyeHeight, eyeRadius, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'black';
		ctx.fill();

		console.log('"{FACE.JS{drawFace()}}tried to draw face cords: '+ centerX + "," + centerY)

    }
    drawGradient(){
        const ctx = this.refs.canvas.getContext('2d');

		// Create gradient
		var gradient=ctx.createRadialGradient(this.props.width/2,this.props.height/2,this.props.width*.3,this.props.width/2,this.props.height/2,this.props.width*.1);
		gradient.addColorStop(0,"#4286f4");
		gradient.addColorStop(1,"#4294e5");

		// Fill with gradient
		ctx.fillStyle = gradient;
        ctx.fillRect(0,0, this.props.width, this.props.height);

	}
    updateCanvas(){
	        const ctx = this.refs.canvas.getContext('2d');
	        //console.log("{FACE.JS{updateCanvas()}} the width and height" +this.props.width + "," + this.props.height );
	        this.moveFaceToMouse();
	        this.drawGradient();
			this.drawFace(this.state.faceX,this.state.faceY);
			//setInterval(this.updateCanvas,100);	
    }

    render() {
        return (
            <canvas ref="canvas" width={this.props.width} height={this.props.height}/>
        );
    }	
}


export default Face;
