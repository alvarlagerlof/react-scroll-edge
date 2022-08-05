# react-scroll-edge

Check if scroll is within an offset to the start or end


# Example
`npm install react-scroll-edge` or `yarn add react-scroll-edge`

```tsx
function Example() {
    const ref = useRef(null);
    const { start, end } = useScrollEdge(ref, "horizontal", 100);

    return (
        <ul ref={ref}>...</ul>
    )
}
```

The return object contains ´start´ and ´end´ booleans which are true if the scroll distance is withing the providded offset to the start/beginning.

## Function type

```tsx
useScrollEdge(
    element: RefObject<HTMLElement>,
    orientation: "horizontal" | "vertical",
    offset?: number = 0
): { start: boolean, end: boolean };
```