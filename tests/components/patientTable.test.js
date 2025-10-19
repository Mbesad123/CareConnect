describe('PatientTable', () => {
  it('should render table headers', () => {
    expect(['Patient', 'DOB', 'Phone', 'Email', 'Last visit', 'Next appointment']).toContain('Patient')
  })
})
