import {Color} from "./graphics/Color";
import {Stroke} from "./graphics/Stroke";
import {Resource} from "./graphics/Resource";
/**
 * A GraphicContext describes the attributes of a shape
 */
export class GraphicContext
{
    constructor()
    {
    }


    public getForeGround():Resource
    {
        return this.foreGround;
    }

    public setForeGround( foreGround:Resource)
    {
        this.foreGround = foreGround;
    }

    public getBackGround():Resource
    {
        return this.backGround;
    }

    public setBackGround( backGround:Resource)
    {
        this.backGround = backGround;
    }

    public getStroke():Resource
    {
        return this.stoke;
    }

    public setStroke( stroke:Resource )
    {
        this.stoke = stroke;
    }
    // Foreground Color
    private foreGround:Resource;

    // Background Color
    private backGround:Resource;

    // Stroke
    private stoke:Resource;
}

