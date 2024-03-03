Add-Type -AssemblyName System.windows.forms
$openFileDialog = New-Object System.Windows.Forms.OpenFileDialog
$openFileDialog.InitialDirectory = [Environment]::GetFolderPath('Desktop')
$openFileDialog.Filter = "All files (*.*)|*.*"
$openFileDialog.DereferenceLinks = $false
$dialogResult = $openFileDialog.ShowDialog()
if ($dialogResult -eq 'OK') {
    $openFileDialog.FileName
}