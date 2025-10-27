export function cutTileset(rows, cols, imgWidth, imgHeight){
    const tilesCords = []
    let width = imgWidth / cols;
    let height = imgHeight / rows;
    let x = 0, y = 0
    for (let i = 0; i < rows; i++){
        y = i * height;
        for (let j = 0; j < cols; j++){
            x = j * width;
            tilesCords.push([x, y]);
        }
    }
    return {
        cords: tilesCords,
        width: width,
        height: height
    };
}