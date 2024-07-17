import React from 'react'

export default function ViDu() {
  return (
    <div class="max-w-md mx-auto bg-card p-6 rounded-lg shadow-md">
  <h2 class="text-center text-lg font-semibold text-foreground mb-4">Yêu cầu xin nghỉ phép</h2>
  <div class="flex items-center mb-4">
    <img src="https://placehold.co/32x32" alt="User avatar" class="w-8 h-8 rounded-full mr-2" />
    <div class="text-foreground">
      <p class="font-semibold">Người gửi</p>
      <p class="text-sm text-muted-foreground">Phòng ban:Nhân sự</p>
    </div>
    <p class="ml-auto text-sm text-muted-foreground">Đã gửi: 26 Th06, 14:04</p>
  </div>
  <div class="mb-4">
   
    <div>
      <label for="related-docs" class="block text-sm font-medium text-foreground">Tài liệu liên quan</label>
      <input type="file" id="related-docs" placeholder="PRO10..." class="mt-1 block w-full p-2 border border-input rounded-md bg-background text-foreground" />
    </div>
  </div>
  <div class="mb-4">
    <h3 class="text-sm font-medium text-foreground mb-2">Hồ sơ phê duyệt</h3>
    <div class="flex items-center mb-2">
      <span class="text-sm font-medium text-foreground w-1/3">Tên bước</span>
      <span class="text-sm font-medium text-foreground w-1/3">Người phê duyệt</span>
      <span class="text-sm font-medium text-foreground w-1/3">Kết quả</span>
    </div>
    <div class="flex items-center mb-2">
      <span class="text-sm text-foreground w-1/3">Phê duyệt</span>
      <div class="flex items-center w-1/3">
        <span class="text-foreground">Ông A</span>
      </div>
      <span class="text-sm text-foreground w-1/3">Phê duyệt</span>
    </div>
    <div class="flex items-center">
      <span class="text-sm text-foreground w-1/3">Phê duyệt</span>
      <div class="flex items-center w-1/3">       
        <span class="text-foreground">Ông B</span>
      </div>
      <span class="text-sm text-foreground w-1/3">Đang được xét duyệt</span>
    </div>
  </div>
  <div class="flex justify-between mt-4">
    <button class="bg-red-400 text-destructive-foreground px-4 py-2 rounded-md">Từ chối</button>
    <button class="bg-black text-primary-foreground px-4 py-2 rounded-md">Phê duyệt</button>
  </div>
</div>
  )
}
