interface ArrowIconProps {
    size: string;
    isActive: boolean;
    isFlipped: boolean;
    fillColors: [string, string];
}

function ArrowIcon(props: ArrowIconProps) {
    return (
        <svg 
            width={props.size} 
            height={props.size} 
            viewBox="0 0 100 100" 
            transform={`scale(${props.isFlipped ? -1 : 1})`} 
            transform-origin="center"
        >
            <g>
                <path
                    fill={props.isActive ? props.fillColors[0] : props.fillColors[1] }
                    d="M 0 50 L 0 14 Q 0 0 12.52 6.26 L 87.48 43.74 Q 100 50 87.48 56.26 L 12.52 93.74 Q 0 100 0 86 Z"
                    stroke="none"
                />
            </g>
        </svg>
    )
}

export default ArrowIcon;