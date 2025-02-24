export const getImageDimensions = (width: number, height: number): number=> {
    if (width > height) {
        return height/12;
    }else
    {
        return width/10;
    }

}