import React from "react"
import { useIntl } from "react-intl";
import { View, Text, TextStyle, StyleProp } from "react-native"

/**
 * Props for the TranslationText component
 * @interface TranslationTextProps
 * @property {string} textTranslation - The translation key/id to look up in the messages
 * @property {string} defaultMessage - Fallback text to display if translation is not found
 * @property {TextStyle} [style] - Optional styling for the text component
 */
interface TranslationTextProps {
    textTranslation: string;
    defaultMessage: string;
    style?: StyleProp<TextStyle>;
}

/**
 * A component that renders translated text using react-intl.
 * Uses the provided translation key to look up the appropriate translation,
 * falling back to the default message if no translation is found.
 */
export const TranslationText: React.FC<TranslationTextProps> = ({textTranslation, defaultMessage, style}) => {
   
    const intl = useIntl();
    return (
        <>
        { defaultMessage != "" &&
        <Text style={style}>{intl.formatMessage({id: textTranslation, defaultMessage})}</Text>

}
        </>
    )
}