import { ComboBox, ComboBoxProps } from '../ComboBox';
import { Slider, SliderProps } from '../Slider';

interface Props {
    groupName: string;
    parameters: Array <SliderProps | ComboBoxProps>;
}

function ParameterGroup(props: Props) {
    return (<div className="parameter-group">
        <h3>{props.groupName}</h3>
        {props.parameters.map(parameter => {
            if (parameter.uiType === "Slider") return (
                <Slider
                    key={`${props.groupName}${parameter.paramName}`}
                    controlNumber={parameter.controlNumber}
                    scale={parameter.scale}
                    paramName={parameter.paramName}
                    statusByte={parameter.statusByte}
                    uiType={parameter.uiType}
                />
            )
            if (parameter.uiType === "ComboBox") return (
                <ComboBox
                    key={`${props.groupName}${parameter.paramName}`}
                    controlNumber={parameter.controlNumber}
                    scale={parameter.scale}
                    options={parameter?.options}
                    paramName={parameter.paramName}
                    statusByte={parameter.statusByte}
                    uiType={parameter.uiType}
                />
            )
        }
        )}
    </div>)
}

export default ParameterGroup;