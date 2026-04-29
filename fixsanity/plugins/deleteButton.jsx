import React from 'react'
import {TrashIcon} from '@sanity/icons'
import {Button, Flex, Text, Dialog, Stack, Card} from '@sanity/ui'

// Plugin để thêm nút xóa vào document
export const DeleteDocumentButton = ({id, type, onComplete}) => {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [error, setError] = React.useState(null)

  const handleDelete = async () => {
    if (!id) return
    
    setIsDeleting(true)
    setError(null)
    
    try {
      // Sử dụng Sanity client để xóa document
      const client = window.client
      
      await client.delete(id)
      setShowConfirmDialog(false)
      
      if (onComplete) {
        onComplete()
      }
    } catch (err) {
      console.error('Lỗi khi xóa document:', err)
      setError(err.message || 'Có lỗi xảy ra khi xóa')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Button
        tone="critical"
        icon={TrashIcon}
        text="Xóa"
        onClick={() => setShowConfirmDialog(true)}
        mode="ghost"
      />
      
      {showConfirmDialog && (
        <Dialog
          header="Xác nhận xóa"
          id="delete-dialog"
          onClose={() => setShowConfirmDialog(false)}
          zOffset={1000}
          width={1}
        >
          <Stack space={4} padding={4}>
            <Text>Bạn có chắc chắn muốn xóa document này không? Hành động này không thể hoàn tác.</Text>
            
            {error && (
              <Card tone="critical" padding={3}>
                <Text>{error}</Text>
              </Card>
            )}
            
            <Flex justify="flex-end" gap={2}>
              <Button 
                text="Hủy" 
                onClick={() => setShowConfirmDialog(false)} 
                mode="ghost"
              />
              <Button 
                text={isDeleting ? 'Đang xóa...' : 'Xóa'} 
                tone="critical" 
                onClick={handleDelete}
                disabled={isDeleting}
              />
            </Flex>
          </Stack>
        </Dialog>
      )}
    </>
  )
}
