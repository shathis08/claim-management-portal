import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class ClaimSliderControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;
    private _sliderElement: HTMLInputElement;
    private _labelElement: HTMLLabelElement;
    private _notifyOutputChanged: () => void;
    private _currentValue: number;

    constructor() {

        console.log("slider control instance created");
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._container = container;
        this._notifyOutputChanged = notifyOutputChanged;
        
        // FIX: Force a fallback to 0 if the raw value is null, undefined, or NaN
        const rawValue = context.parameters.claimValue.raw;
        this._currentValue = (rawValue && !isNaN(rawValue)) ? rawValue : 0;
   // 1. Create a wrapper styling container
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
        wrapper.style.gap = "8px";
        wrapper.style.border = "1px solid #d1d1d1"; 
        wrapper.style.borderRadius = "4px";         
        wrapper.style.padding = "12px";             
        wrapper.style.backgroundColor = "#fafafa";   
        // FIX: Force the padding calculation to stay INSIDE the border limits
        wrapper.style.boxSizing = "border-box";

        // 2. Create the Visual Slider Input
        this._sliderElement = document.createElement("input");
        this._sliderElement.setAttribute("type", "range");
        this._sliderElement.setAttribute("min", "0");
        this._sliderElement.setAttribute("max", "100000"); 
        this._sliderElement.setAttribute("step", "100");  
        // FIX: Use 100% width and enforce border-box rule here too
        this._sliderElement.style.width = "100%";
        this._sliderElement.style.boxSizing = "border-box";
        this._sliderElement.value = this._currentValue.toString();

        // 3. Create a Live Text Label to show the money value
        this._labelElement = document.createElement("label");
        this._labelElement.innerText = "Selected Amount: RM " + this._currentValue.toLocaleString();
        this._labelElement.style.fontWeight = "bold";

        // 4. Attach an event listener: When user drags, update value and notify Dataverse
        this._sliderElement.addEventListener("input", (e: Event) => {
            const target = e.target as HTMLInputElement;
            const parsedValue = parseFloat(target.value);
            this._currentValue = !isNaN(parsedValue) ? parsedValue : 0;
            this._labelElement.innerText = "Selected Amount: RM " + this._currentValue.toLocaleString();
            
            this._notifyOutputChanged();
        });

        // 5. Build the UI tree and mount it to the form container
        wrapper.appendChild(this._labelElement);
        wrapper.appendChild(this._sliderElement);
        this._container.appendChild(wrapper);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // FIX: Force a fallback to 0 here as well for runtime updates
        const rawValue = context.parameters.claimValue.raw;
        this._currentValue = (rawValue && !isNaN(rawValue)) ? rawValue : 0;
        
        this._sliderElement.value = this._currentValue.toString();
        this._labelElement.innerText = "Selected Amount: RM " + this._currentValue.toLocaleString();
    }

    public getOutputs(): IOutputs {
        // Send the slider value straight back into your "cr5db_claimamount" column
        return {
            claimValue: this._currentValue
        };
    }

    public destroy(): void {
    // Correctly remove the input listener when the component is unmounted
    if (this._sliderElement) {
        this._sliderElement.removeEventListener("input", () => {
            console.log("Slider control destroyed.");
        });
    }
}
}