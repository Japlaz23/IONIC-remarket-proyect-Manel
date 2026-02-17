<template>
  <ion-app>
    <ion-router-outlet :animated="true" :animation="globalTransition" />
  </ion-app>
</template>

<script setup lang="ts">
import { createAnimation, IonApp, IonRouterOutlet } from '@ionic/vue'

const globalTransition = (_: HTMLElement, opts: { direction?: 'forward' | 'back'; enteringEl: HTMLElement; leavingEl?: HTMLElement }) => {
  const enteringEl = opts.enteringEl
  const leavingEl = opts.leavingEl
  const backDirection = opts.direction === 'back'

  const enteringAnimation = createAnimation()
    .addElement(enteringEl)
    .duration(260)
    .easing('cubic-bezier(0.2, 0.0, 0.2, 1)')
    .fromTo('transform', `translateX(${backDirection ? '-30%' : '30%'})`, 'translateX(0)')
    .fromTo('opacity', 0.6, 1)

  if (!leavingEl) {
    return enteringAnimation
  }

  const leavingAnimation = createAnimation()
    .addElement(leavingEl)
    .duration(240)
    .easing('cubic-bezier(0.4, 0.0, 0.6, 1)')
    .fromTo('transform', 'translateX(0)', `translateX(${backDirection ? '30%' : '-30%'})`)
    .fromTo('opacity', 1, 0.6)

  return createAnimation().addAnimation([enteringAnimation, leavingAnimation])
}
</script>

<style>
ion-app {
  --ion-background-color: #f5f5f5;
}
</style>
