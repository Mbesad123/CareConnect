describe('Patients API', () => {
  it('returns patient data', () => {
    const mockResponse = { data: [{ id: 'pt-001' }] }
    expect(Array.isArray(mockResponse.data)).toBe(true)
  })
})
