import jss from 'jss';
import jssDefault from 'jss-preset-default'

jss.setup(jssDefault());

export default function styles(styles) {
    // ask to pre-bind this method
    return jss.createStyleSheet(styles).attach()
}