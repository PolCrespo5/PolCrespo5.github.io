export function calculateObjectContainer(width, height, widthMultiplier, heightMultiplier) {
    let containerWidth;
    let conatinerHeight;
    const aspectRatio = window.innerWidth / window.innerHeight;
    if (aspectRatio > 2) {
        containerWidth = window.innerWidth * width;
        conatinerHeight = window.innerHeight * height;
    } else if (aspectRatio < 2 && aspectRatio > 1.8) {
        containerWidth = window.innerWidth * width*1.1;
        conatinerHeight = window.innerHeight * height;
    } else if (aspectRatio < 1.8 && aspectRatio > 1.6) {
        containerWidth = window.innerWidth * width*1.3;
        conatinerHeight = window.innerHeight * height;
    }else if (aspectRatio < 1.6 && aspectRatio > 1.4) {
        containerWidth = window.innerWidth * width*1.5;
        conatinerHeight = window.innerHeight * height;
    }else if (aspectRatio < 1.4 && aspectRatio > 1.2) {
        containerWidth = window.innerWidth * width*1.7;
        conatinerHeight = window.innerHeight * height;
    }else if (aspectRatio < 1.2 && aspectRatio > 1) {
        containerWidth = window.innerWidth * width*2* widthMultiplier;
        conatinerHeight = window.innerHeight * height;
    }else if (aspectRatio < 1 && aspectRatio > 0.8) {
        containerWidth = window.innerWidth * width*1.2* widthMultiplier;
        conatinerHeight = window.innerHeight * height/1.8;
    }else if (aspectRatio < 0.8 && aspectRatio > 0.6) {
        containerWidth = window.innerWidth * width * 1.4* widthMultiplier;
        conatinerHeight = window.innerHeight * height / 1.6;
    } else if (aspectRatio < 0.6 && aspectRatio > 0.4) {
        containerWidth = window.innerWidth * width * 2.3* widthMultiplier;
        conatinerHeight = window.innerHeight * height / 1.8;
    }else {
        containerWidth = window.innerWidth * 0.8* widthMultiplier;
        conatinerHeight = window.innerHeight * 0.8;
    }
    return { containerWidth, conatinerHeight };
}

