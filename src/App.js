import { BlurFilter } from 'pixi.js';
import * as PIXI from "pixi.js";
import { Stage, Container, Sprite, Text, PixiComponent, Graphics, useApp } from '@pixi/react';
import { useMemo, React } from 'react';
import { Viewport as PixiViewport } from 'pixi-viewport'

const SomeComponent = PixiComponent('SomeComponent', {
  create: (props) => {
    // instantiate something and return it.
    // for instance:

    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xFF3300);
    graphics.drawRect(0, 0, 200, 180);
    graphics.endFill();
   
    const sprite = PIXI.Sprite.from("https://res.cloudinary.com/mixtiles/image/fetch/f_auto,q_auto:good/c_thumb,w_700,h_1111/https://mixtiles-uploads.s3.amazonaws.com/eddcb5188908791535c9f16893dab812_upload_web.jpg?10")
    sprite.anchor.set(0.5);
    sprite.width = 400
    sprite.height = 200
    sprite.x = 200
    sprite.y = 200

    sprite.mask = graphics;

    return sprite;
    
  },
  didMount: (instance, parent) => {
    // apply custom logic on mount
  },
  willUnmount: (instance, parent) => {
    // clean up before removal
  },
  applyProps: (instance, oldProps, newProps) => {
    // props changed
    // apply logic to the instance
  },
  config: {
    // destroy instance on unmount?
    // default true
    destroy: true,

    /// destroy its children on unmount?
    // default true
    destroyChildren: true,
  },
});

const PixiComponentViewport = PixiComponent('Viewport', {
  create: (props) => {
    // instantiate something and return it.
    // for instance:
    console.log(props)
    console.log("before viewport const");

    const viewport = new PixiViewport({
    screenWidth: props.width,
    screenHeight: props.height,
    worldWidth: props.width * 2,
    worldHeight: props.height * 2,
    // interaction: props.app.renderer.plugins.interaction
    events: props.app.renderer.events // the interaction module is important for wheel to work properly when renderer.view is placed or scaled

  })
  console.log("after viewport const");

  console.log(viewport);

  viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate()

    viewport.zoomPercent(0)

    return viewport;
    
  },
  didMount: (instance, parent) => {
    // apply custom logic on mount
  },
  willUnmount: (instance, parent) => {
    // clean up before removal
  },
  applyProps: (instance, oldProps, newProps) => {
    // props changed
    // apply logic to the instance
  },
  config: {
    // destroy instance on unmount?
    // default true
    destroy: true,

    /// destroy its children on unmount?
    // default true
    destroyChildren: true,
  },
});

const Viewport = (props) => {
console.log(props)
  const app = useApp();
  return (
    <PixiComponentViewport app={app} {...props}>
      {props.children}
    </PixiComponentViewport>
  )
}

export const App = () =>
{
  const blurFilter = useMemo(() => new BlurFilter(4), []);

  return (
    <Stage width={500} height={500} options = {{
      backgroundAlpha: 0,
      antialias: true,
    }}>
      <Viewport width={500} height={500}>

      <SomeComponent/>

      <Container x={400} y={330}>
        <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />
      </Container>
      </Viewport>
      </Stage>
  );
};

export default App;