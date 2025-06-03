
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key } from 'lucide-react';

interface MasterPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  title: string;
  description: string;
  confirmText?: string;
}

export const MasterPasswordDialog: React.FC<MasterPasswordDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm"
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNewPassword, setIsNewPassword] = useState(title.includes('Set'));

  const handleConfirm = () => {
    if (isNewPassword && password !== confirmPassword) {
      return;
    }
    onConfirm(password);
    setPassword('');
    setConfirmPassword('');
  };

  const isValid = password.length >= 8 && (!isNewPassword || password === confirmPassword);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="master-password">Master Password</Label>
            <Input
              id="master-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter master password..."
              onKeyDown={(e) => e.key === 'Enter' && isValid && handleConfirm()}
            />
          </div>

          {isNewPassword && (
            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm master password..."
                onKeyDown={(e) => e.key === 'Enter' && isValid && handleConfirm()}
              />
            </div>
          )}

          {isNewPassword && (
            <Alert>
              <AlertDescription>
                <strong>Important:</strong> Your master password encrypts all your keys locally. 
                If you lose it, your data cannot be recovered. Store it safely!
              </AlertDescription>
            </Alert>
          )}

          {password.length > 0 && password.length < 8 && (
            <Alert>
              <AlertDescription>
                Password must be at least 8 characters long.
              </AlertDescription>
            </Alert>
          )}

          {isNewPassword && password.length >= 8 && confirmPassword.length > 0 && password !== confirmPassword && (
            <Alert>
              <AlertDescription>
                Passwords do not match.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!isValid}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
