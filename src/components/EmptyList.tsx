import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

import Colors from 'utils/colors'

type Props = { title?: string }

const EmptyList = (props: Props): JSX.Element => (
  <Text style={styles.emptyText}>{props?.title || 'No items to display'}</Text>
)

export default EmptyList

const styles = StyleSheet.create({
  emptyText: { color: Colors.gray, textAlign: 'center', marginTop: 10 },
})
