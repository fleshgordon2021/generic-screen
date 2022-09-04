export interface CommandMessage {
    messageName: string;
    businessKey: string;
    correlationKeys?: any;
    processVariables?: any;
}