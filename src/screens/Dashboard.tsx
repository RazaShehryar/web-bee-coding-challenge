import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

import Center from 'components/Center'
import DashboardList from 'components/DashboardList'

import store from 'context/store'

import { Category } from 'models/Category'

import Colors from 'utils/colors'
import { navigate } from 'utils/navigation'

const keyExtractor = (item: Category) => item.id
const renderItem = ({ item }: { item: Category }) => (
  <DashboardList categoryId={item.id} />
)

const onPress = () => navigate('ManageCategories')
const EmptyList = () => (
  <Center style={styles.container}>
    <Text variant="headlineSmall">No categories found</Text>
    <Button mode="contained" style={styles.button} onPress={onPress}>
      ADD A CATEGORY
    </Button>
  </Center>
)

const Dashboard: FC = () => {
  const { categories, orientation } = store

  return (
    <View style={styles.container}>
      {Object.values(categories).length ? (
        <FlatList
          key={orientation}
          data={Object.values(categories)}
          ListEmptyComponent={EmptyList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.contentContainer}
        />
      ) : (
        <EmptyList />
      )}
    </View>
  )
}

export default observer(Dashboard)

const styles = StyleSheet.create({
  contentContainer: { paddingBottom: 40 },
  button: {
    backgroundColor: Colors.purple,
    borderRadius: 5,
    marginTop: 10,
  },
  container: { flex: 1 },
})
