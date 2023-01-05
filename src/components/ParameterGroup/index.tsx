import { Slider, SliderProps } from '../Slider';
import { ComboBox, ComboBoxProps} from '../ComboBox';

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
                    convert={parameter.convert}
                    paramName={parameter.paramName}
                    statusByte={parameter.statusByte}
                    uiType={parameter.uiType}
                />
            )
            if (parameter.uiType === "ComboBox") return (
                <ComboBox
                    key={`${props.groupName}${parameter.paramName}`}
                    controlNumber={parameter.controlNumber}
                    convert={parameter.convert}
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