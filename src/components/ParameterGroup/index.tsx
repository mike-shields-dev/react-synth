import { ComboBox, ComboBoxProps } from '../ComboBox';
import { Slider, SliderProps } from '../Slider';
import css from './index.module.css';

interface Props {
    groupName: string;
    parameters: Array <SliderProps | ComboBoxProps>;
}

function ParameterGroup(props: Props) {
    return (
        <div className={css.ParameterGroup}>
            <h3>{props.groupName}</h3>
            <div className={css.ParameterGroup__controls}>
            {props.parameters.map(parameter => {
                if (parameter.uiType === "Slider") return (
                    <Slider
                        key={`${props.groupName}${parameter.paramName}`}
                        controlNumber={parameter.controlNumber}
                        scale={parameter.scale}
                        paramName={parameter.paramName}
                        statusByte={parameter.statusByte}
                        uiType={parameter.uiType}
                        initValue={parameter.initValue}
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
                        initValue={parameter.initValue}
                    />
                )
            }
            )}
            </div>
        </div>)
}

export default ParameterGroup;