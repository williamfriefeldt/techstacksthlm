import {
  AnimationMetadata,
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fold: AnimationMetadata = trigger('fold', [
  transition(
    ':enter',
    [
      style({ height: '100%', maxHeight: '0', opacity: 0 }),
      animate(
        '0.5s {{delay}} ease-in',
        style({ maxHeight: '999px', opacity: 1 })
      ),
    ],
    {
      params: { delay: '0s' },
    }
  ),
  transition(':leave', [
    style({ height: '100%', maxHeight: '999px' }),
    animate('0.25s ease-out', style({ maxHeight: '0', opacity: 0 })),
  ]),
]);
