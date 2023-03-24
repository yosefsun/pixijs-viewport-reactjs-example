import React from "react";
import * as PIXI from "pixi.js";
import { Stage, Container, Sprite, Text, Graphics, PixiComponent, useApp } from '@pixi/react';
import { Viewport } from "pixi-viewport";

const PixiViewportComponent = PixiComponent("Viewport", {
  create(props) {
    const { app, ...viewportProps } = props;

    const viewport = new Viewport.Viewport({
      ticker: props.app.ticker,
      interaction: props.app.renderer.plugins.interaction,
      ...viewportProps
    });

    // activate plugins
    (props.plugins || []).forEach((plugin) => {
      viewport[plugin]();
    });

    return viewport;
  },
  applyProps(viewport, _oldProps, _newProps) {
    const { plugins: oldPlugins, children: oldChildren, ...oldProps } = _oldProps;
    const { plugins: newPlugins, children: newChildren, ...newProps } = _newProps;

    Object.keys(newProps).forEach((p) => {
      if (oldProps[p] !== newProps[p]) {
        viewport[p] = newProps[p];
      }
    });
  },
  didMount() {
    console.log("viewport mounted");
  }
});

export default PixiViewportComponent